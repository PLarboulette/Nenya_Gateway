/**
 * Created by Pierre on 14/04/16.
 */

'use strict';

const express = require('express');
const appExpress = express();
const http = require('http').Server(appExpress);
const io = require('socket.io')(http);

const path = require('path');
const favicon = require('serve-favicon');
const session = require('express-session');
const bodyParser = require('body-parser');

const Router = require("./api/router/Router");
const Helper = require ("./amqp/Helper");
const Events = require  ("./api/socket/Events");

 class app {

    constructor () {
        this.init();
        this.launch();
    }

    init () {
        appExpress.set('port', process.env.PORT || 3000);
        // app.use(favicon(__dirname + '/public/favicon.ico'));
        appExpress.use(session({ resave: true, saveUninitialized: true, secret: 'unicorn' }));
        appExpress.use(bodyParser.json());
        appExpress.use(bodyParser.urlencoded({ extended: true }));
        appExpress.use(express.static(__dirname + '/../public'));
        appExpress.use('/api',  new Router().getRouter());

    }

    launch() {
        http.listen(appExpress.get('port'), function(){
            console.log("INFO = [Listening on port "+appExpress.get('port')+"]");
            var helper = new Helper('localhost');
            var events = new Events(helper);
            events.setUpApi(io);
        });
    }
}

new app();