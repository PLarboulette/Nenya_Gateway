/**
 * Created by plarboul on 14/04/2016.
 */

// Imports
var Helper = require("./../../amqp/Helper");
var Constants = require("./../../utils/Constants");

// Exports
exports.createUser = _createUser;
exports.readUsers = _readUsers;
exports.readUser = _readUser;
exports.updateUser = _updateUser;
exports.deleteUser = _deleteUser;

// Private

// Create new user
function _createUser(user, callback) {
    /*var user = {};
    user.login = req.body.login;
    user.password = req.body.password;
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.rank = req.body.rank;
    user.register = req.body.register;*/

    Helper.publish(JSON.stringify(user), Constants.USERS, Constants.CREATE_USER, callback);
}

function _readUsers(req, res, callback) {
    // TODO
}

function _readUser(req, res, callback) {
    // TODO
}

function _updateUser(req, res, callback) {
    // TODO
}

function _deleteUser(req, res, callback) {
    // TODO
}