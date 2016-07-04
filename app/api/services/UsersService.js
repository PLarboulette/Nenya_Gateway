/**
 * Created by Pierre on 14/04/2016.
 */

'use strict';

// Imports
var Constants = require("./../../utils/Constants");
const Helper = require("../../amqp/Helper");

module.exports = class UserService {

    constructor(helper) {
        this.sockets = [];
        this.helper = helper;
    }

    /**
     * Register new socket
     * @param socket = the new socket to register
     */
    register(socket) {
        this.sockets.push(socket);
    }

    /**
     * Create new user
     * @param user = the new user to create
     */
     createUser(user) {
        this.helper.publish(JSON.stringify(user), Constants.USERS, Constants.CREATE_USER, (err, user) => {
            this.sockets.forEach((socket) => {
                if (err) socket.emit(Constants.ERROR);
                else socket.emit(Constants.USER_CREATED, user);
            });
        });
    };

    /**
     * Update an user with its new data
     * @param user = the new data of the user
     */
    updateUser(user) {
        this.helper.publish(JSON.stringify(user), Constants.USERS, Constants.UPDATE_USER,(err, user) => {
            this.sockets.forEach((socket) => {
                if (err) socket.emit(Constants.ERROR);
                else socket.emit(Constants.USER_UPDATED, user);
            });
        });
    }

    /**
     * Delete an user
     * @param idUser = the id of the user we want to delete
     */
    deleteUser(idUser) {
        this.helper.publish(JSON.stringify(idUser), Constants.USERS, Constants.DELETE_USER, (err, idUser) => {
            this.sockets.forEach((socket) => {
                if (err) socket.emit(Constants.ERROR);
                else socket.emit(Constants.USER_DELETED, idUser);
            });
        });
    }

    /**
     * Get all the users in database
     * @param filters = fields to filter the result
     */
    getUsers(filters) {
        this.helper.publish(JSON.stringify(filters), Constants.USERS, Constants.GET_USERS,(err, users) => {
            this.sockets.forEach((socket) => {
                if (err) socket.emit(Constants.ERROR);
                else socket.emit(Constants.USERS_RETURNED, users);
            });
        });
    }

    /**
     * Get the user with the id taken in parameter
     * @param idUser = the id of the user
     */
    getUser(idUser) {
        this.helper.publish(JSON.stringify(idUser), Constants.USERS, Constants.GET_USER, (err, user) => {
            this.sockets.forEach((socket) => {
                if (err) socket.emit(Constants.ERROR);
                else socket.emit(Constants.USER_RETURNED, user);
            });
        });
    }
};