/**
 * Created by pierre on 23/02/16.
 */

// Imports
var amqp = require('amqplib/callback_api');
var uuid = require("uuid");

// Exports
exports.start = _start;
exports.shutdown = _shutdown;
exports.publish = _publish;

// Private
var rabbitMQConnection;

// Launch connection to RabbitMQ
function _start(host) {
    amqp.connect('amqp://' + host, function (err, conn) {
        rabbitMQConnection = conn;
        console.log("INFO = [Connection to RabbitMQ established]");
    });
}

// Shutdown the connection
function _shutdown() {
    rabbitMQConnection.close();
}

// Publish new message in RabbitMQ
function _publish(message, exchange, routingKey, callback) {

    rabbitMQConnection.createChannel(function (err, ch) {
        ch.assertQueue('', {exclusive: true}, function (err, q) {
            var corr = uuid.v4();
            ch.assertExchange(exchange, 'direct', {durable: false});
            ch.publish(exchange, routingKey, new Buffer(message.toString()), {correlationId: corr, replyTo: q.queue});
            ch.consume(q.queue, function (msg) {
                if (msg.properties.correlationId == corr) {
                    console.log(msg.content.toString());
                    callback(err, msg.content.toString());
                }
            }, {noAck: true});
        });
    });
}
