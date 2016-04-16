/**
 * Created by pierre on 15/04/16.
 */

// Imports
var Constants = require("./../../utils/Constants");
var AuthenticationController = require("./../controllers/AuthenticationController");
var UsersController = require("./../controllers/UsersController");

// Exports
exports.setUpApi = _setUpApi;

// Private

function _setUpApi (io) {

    io.on('connection', function(socket){
        console.log('INFO = [User connected to Websocket]');

        // Let to login a user and return it To client to put it to list of connected accounts
        socket.on(Constants.LOGIN, function (err, user) {
            AuthenticationController.login(user, function (err, user) {
                io.emit(Constants.LOGIN, user);
            })
        });

        // Create a new user and return it to client side
        socket.on(Constants.CREATE_USER, function (user) {
            UsersController.createUser(user, function (err, user) {
                io.emit(Constants.USER_CREATED, user);
            });
        });


    });
}
