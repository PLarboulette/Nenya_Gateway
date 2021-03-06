/**
 * Created by Pierre on 15/04/16.
 */

'use strict';

// Imports
const Constants = require("./../../utils/Constants");
const AuthenticationEvents = require ("./AuthenticationEvents");
const UsersEvents = require("./UsersEvents");
const ProjectsEvents = require("./ProjectsEvents");


// Exports

module.exports = class Events {

    constructor (helper) {
        this.helper = helper;
        this.authenticationEvents = new AuthenticationEvents(this.helper);
        this.userEvents = new UsersEvents(this.helper);
        this.projectEvents = new ProjectsEvents(this.helper);
    }

    setUpApi (io) {
        io.on('connection', (socket) => {
            console.log('INFO = [User connected to Websocket]');

            // Set up api for authentication events
            this.authenticationEvents.setUpApiAuthentication(socket);

            // Set up the api for users events
            this.userEvents.setUpApiUsers(socket);

            // Set up api for projects events
            this.projectEvents.setUpApiProjects(socket);
        });
    }
};
