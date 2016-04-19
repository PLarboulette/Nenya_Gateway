/**
 * Created by pierre on 16/04/16.
 */

// Imports
var Constants = require('./../../utils/Constants');
var AuthenticationController = require("./../controllers/AuthenticationController");

// Exports
exports.setUpApiAuthentication = _setUpApiAuthentication;

// Private

function _setUpApiAuthentication (io, socket) {

    // Let to login a user and return it To client to put it to list of connected accounts
    socket.on(Constants.LOGIN, function (err, user) {
        AuthenticationController.login(user, function (err, user) {
            io.emit(Constants.LOGIN, user);
        })
    });


}