/**
 * Created by Pierre on 15/04/16.
 */

'use strict';

// Imports
var Helper = require("./../../amqp/Helper");
var Constants = require("./../../utils/Constants");

module.exports = class AuthenticationService {

    constructor () {
        this.sockets = [];
    }

    /**
     * Register new socket
     * @param socket = the new socket to register
     */
    register (socket) {
        this.sockets.push(socket);
    }

    login (user) {
        new Helper().publish(JSON.stringify(user), Constants.USERS, Constants.LOGIN, (err, user) => {
            this.sockets.forEach((socket) => {
                if (err) socket.emit(Constants.ERROR);
                else socket.emit(Constants.LOGIN, user);
            });
        });
    }

    logout(user) {
        new Helper().publish(JSON.stringify(user), Constants.USERS, Constants.LOGOUT, (err, user) => {
            this.sockets.forEach((socket) => {
                if (err) socket.emit(Constants.ERROR);
                else socket.emit(Constants.LOGOUT, user);
            });
        });
    }
};

