/**
 * Created by plarboul on 14/04/2016.
 */

// Imports
var UsersService = require("./../services/UsersService");

// Exports
exports.createUser = _createUser;
exports.readUsers = _getUsers;
exports.readUser = _readUser;
exports.updateUser = _updateUser;
exports.deleteUser = _deleteUser;

// Private

function _createUser(user, callback) {
    UsersService.createUser( user, callback);
}

function _getUsers(req, res, callback) {
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