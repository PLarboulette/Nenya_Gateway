/**
 * Created by pierre on 15/04/16.
 */

// Imports
var Constants = require("./../../utils/Constants");
var UsersController = require("./../controllers/UsersController");

// Exports
exports.setUpApi = _setUpApi;

// Private

function _setUpApi (io) {

    io.on('connection', function(socket){
        console.log('a user connected');

        socket.on(Constants.CREATE_USER, function (user) {

            UsersController.createUser(user, function (err, user) {
                io.emit(Constants.USER_CREATED, "Test");

            });

        });




    });



}
