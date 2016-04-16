/**
 * Created by pierre on 14/04/16.
 */

// Imports modules
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var path = require('path');
var favicon = require('serve-favicon');
var session = require('express-session');
var bodyParser = require('body-parser');

// Imports own files
var Events = require("./api/socket/Events");

// AMQP
var HelperAMQP = require("./amqp/Helper");

// all environments
app.set('port', process.env.PORT || 3000);
// app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(session({ resave: true, saveUninitialized: true, secret: 'unicorn' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../public'));

var router = require('./api/router/Router');
app.use('/api', router);

http.listen(app.get('port'), function(){
    console.log('listening on *:3000');
    Events.setUpApi(io);
    HelperAMQP.start("localhost");

});

module.exports.app = app;

