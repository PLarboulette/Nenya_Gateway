/**
 * Created by pierre on 15/04/16.
 */

// Imports

var Helper = require("./../../amqp/Helper");
var Constants = require("./../../utils/Constants");

// Exports
exports.login = _login;
exports.logout = _logout;

// Private
function _login(user, callback) {
    Helper.publish(JSON.stringify(user), Constants.USERS, Constants.LOGIN, callback);
}

function _logout(req, res) {
    // TODO
}
