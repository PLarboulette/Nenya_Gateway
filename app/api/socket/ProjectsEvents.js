/**
 * Created by pierre on 04/07/16.
 */

'use strict';

// Imports
const Constants = require('./../../utils/Constants');
const ProjectsService = require ("../services/ProjectsService");

module.exports = class ProjectsEvents {


    constructor (helper) {
        this.helper = helper;
        this.projectsService = new ProjectsService(this.helper)
    }

    setUpApiProjects (socket) {

        // Register the socket
        this.projectsService.register(socket);

        // Publish message in queue and will be read by Projects microservice and return data of project created
        socket.on(Constants.CREATE_PROJECT,  (project) => {
            this.projectsService.createProject(project);
        });

        // Publish message in queue and will be read by Projects microservice and return data of project updated
        socket.on(Constants.UPDATE_PROJECT,  (project) => {
            this.projectsService.updateProject(project);
        });

        // Publish message in queue and will be read by Projects microservice and return id of the project deleted
        socket.on(Constants.DELETE_PROJECT, (idProject) => {
            this.projectsService.deleteProject(idProject);
        });

        // Publish message in queue, will be read by Projects microservice and return all the projects in database
        socket.on(Constants.GET_PROJECTS, (filters) => {
            this.projectsService.getProjects(filters);
        });

        // Publish message in queue, will be read by Projects microservice and return the project with the given id
        socket.on(Constants.GET_PROJECT, (idProject) => {
            this.projectsService.getProject(idProject);
        });
    }
};

