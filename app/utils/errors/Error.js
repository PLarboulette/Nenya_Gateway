/**
 * Created by pierre on 14/04/16.
 */


var NenyaErrors = exports.NenyaErrors = function (message, code) {
    this.error = true;
    this.message = message;
    this.code = code;
};

module.exports.InternalError = function () {
    return new NenyaErrors("Internal error", 500);
};

module.exports.AuthenticationError = function () {
    return new NenyaErrors("Authentication error", 401);
};

module.exports.NotFoundError = function () {
    return new NenyaErrors("Not found", 404);
};

module.exports.BadRequestError = function () {
    return new NenyaErrors("Bad request", 400);
};

module.exports.ForbiddenError = function () {
    return new NenyaErrors("Forbidden", 403);
};

