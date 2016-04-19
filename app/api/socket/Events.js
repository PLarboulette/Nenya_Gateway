/**
 * Created by pierre on 15/04/16.
 */

// Imports
var Constants = require("./../../utils/Constants");
var UsersEvents = require('./UsersEvents');
var AuthenticationEvents = require("./AuthenticationEvents");

// Exports
exports.setUpApi = _setUpApi;

// Private

function _setUpApi (io) {

    io.on('connection', function(socket){
        console.log('INFO = [User connected to Websocket]');

        // Set up api for authentication events
        AuthenticationEvents.setUpApiAuthentication(io, socket);

        // Set up the api for users events
        UsersEvents.setUpApiUsers(io, socket);


    });
}
