/**
 * Created by pierre on 15/04/16.
 */

'use strict';

// Imports
var Constants = require("./../../utils/Constants");
const Helper = require("../../amqp/Helper");

module.exports = class ProjectsService {

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
     * Create new project
     * @param project = the new project to create
     */
    createProject(project) {
        this.helper.publish(JSON.stringify(project), Constants.PROJECTS, Constants.CREATE_PROJECT, (err, project) => {
            this.sockets.forEach((socket) => {
                if (err) socket.emit(Constants.ERROR);
                else socket.emit(Constants.PROJECT_CREATED, project);
            });
        });
    };

    /**
     * Update a project with its new data
     * @param project = the new data of the project
     */
    updateProject(project) {
        this.helper.publish(JSON.stringify(project), Constants.PROJECTS, Constants.UPDATE_PROJECT,(err, project) => {
            this.sockets.forEach((socket) => {
                if (err) socket.emit(Constants.ERROR);
                else socket.emit(Constants.PROJECT_UPDATED, project);
            });
        });
    }

    /**
     * Delete a project
     * @param idProject = the id of the project we want to delete
     */
    deleteProject(idProject) {
        this.helper.publish(JSON.stringify(idProject), Constants.PROJECTS, Constants.DELETE_PROJECT, (err, idProject) => {
            this.sockets.forEach((socket) => {
                if (err) socket.emit(Constants.ERROR);
                else socket.emit(Constants.PROJECT_DELETED, idProject);
            });
        });
    }

    /**
     * Get all the projects in database
     * @param filters = fields to filter the result
     */
    getProjects(filters) {
        this.helper.publish(JSON.stringify(filters), Constants.PROJECTS, Constants.GET_PROJECTS,(err, projects) => {
            this.sockets.forEach((socket) => {
                if (err) socket.emit(Constants.ERROR);
                else socket.emit(Constants.PROJECTS_RETURNED, projects);
            });
        });
    }

    /**
     * Get the project with the id taken in parameter
     * @param idProject = the id of the project
     */
    getProject(idProject) {
        this.helper.publish(JSON.stringify(idProject), Constants.PROJECTS, Constants.GET_PROJECT, (err, project) => {
            this.sockets.forEach((socket) => {
                if (err) socket.emit(Constants.ERROR);
                else socket.emit(Constants.PROJECT_RETURNED, project);
            });
        });
    }
};