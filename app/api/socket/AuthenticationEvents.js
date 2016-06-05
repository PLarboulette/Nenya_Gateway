/**
 * Created by Pierre on 16/04/16.
 */

'use strict';

// Imports
var Constants = require('./../../utils/Constants');
const authenticationService = require ("../services/AuthenticationService");

module.exports = class AuthenticationEvents {


    constructor (helper) {
        this.helper = helper;
        this.authenticationService = new authenticationService(this.helper);
    }

    setUpApiAuthentication (socket) {
        // Let to login a user and return it To client to put it to list of connected accounts
        socket.on(Constants.LOGIN, (err, user) => {
            this.authenticationService.login(user)
        });
    }
};