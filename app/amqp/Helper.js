/**
 * Created by Pierre on 23/02/16.
 */

'use strict';

// Imports
var amqp = require('amqplib/callback_api');
const uuid = require("uuid");

module.exports = class Helper {

    constructor (host) {
        amqp.connect('amqp://' + host, (err, conn) => {
            this.rabbitMQConnection = conn;
            console.log("INFO = [Connection to RabbitMQ established]");
        });
    }

    shutdown () {
        this.rabbitMQConnection.close();
    }

    /**
     * Publish a new message in RabbitMQ
     * @param message = the message to publish
     * @param exchange = 'users' | 'projects' | ...
     * @param routingKey 'login' | 'create_X' | ...
     * @param callback  = callback function
     */
    publish(message, exchange, routingKey, callback) {
        this.rabbitMQConnection.createChannel( (err, ch) => {
            ch.assertQueue('', {exclusive: true}, (err, q) => {
                var corr = uuid.v4();
                ch.assertExchange(exchange, 'direct', {durable: false});
                ch.publish(exchange, routingKey, new Buffer(message.toString()), {correlationId: corr, replyTo: q.queue});
                ch.consume(q.queue,(msg) => {
                    if (msg.properties.correlationId == corr) {
                        console.log(msg.content.toString());
                        callback(err, msg.content.toString());
                    }
                }, {noAck: true});
            });
        });
    }
};