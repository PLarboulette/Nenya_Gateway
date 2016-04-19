/**
 * Created by pierre on 16/04/16.
 */


// Imports
var Constants = require('./../../utils/Constants');
var UsersController = require("./../controllers/UsersController");

// Exports

exports.setUpApiUsers = _setUpApiUsers;

// Private

function _setUpApiUsers (io, socket) {

    socket.on(Constants.CREATE_USER, function (user) {
        UsersController.createUser(user, function (err, user) {
            io.emit(Constants.USER_CREATED, user);
        });
    });

}