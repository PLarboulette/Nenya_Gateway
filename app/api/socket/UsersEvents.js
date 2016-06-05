/**
 * Created by Pierre on 16/04/16.
 */

'use strict';

// Imports
const Constants = require('./../../utils/Constants');
const UsersService = require ("../services/UsersService");

module.exports = class UsersEvents {


    constructor (helper) {
        this.helper = helper;
        this.usersService = new UsersService(this.helper)
    }

    setUpApiUsers (socket) {

        // Register the socket
        this.usersService.register(socket);

        // Publish message in queue and will be read by Users microservice and return data of user created
        socket.on(Constants.CREATE_USER,  (user) => {
            this.usersService.createUser(user);
        });

        // Publish message in queue and will be read by Users microservice and return data of user updated
        socket.on(Constants.UPDATE_USER,  (user) => {
            this.usersService.updateUser(user);
        });

        // Publish message in queue and will be read by Users microservice and return id of the user deleted
        socket.on(Constants.DELETE_USER, (idUser) => {
            this.usersService.deleteUser(idUser);
        });

        // Publish message in queue, will be read by Users microservice and return all the users in database
        socket.on(Constants.GET_USERS, (filters) => {
            this.usersService.getUsers(filters);
        });

        // Publish message in queue, will be read by Users microservice and return the user with the given id
        socket.on(Constants.GET_USER, (idUser) => {
            this.usersService.getUser(idUser);
        });
    }
};

