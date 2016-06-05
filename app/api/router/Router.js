/**
 * Created by pierre on 14/04/16.
 */

'use strict';

// Imports
const RouterExpress = require('express').Router();
var AuthenticationController = require("./../controllers/AuthenticationController");
var UsersController = require("./../controllers/UsersController");


module.exports = class Router {

    constructor () {
        this.router = RouterExpress;
        this.init();
        this.loginRoutes();
        this.usersRoutes();

    }
    
    getRouter () {
        return this.router; 
    }

    init () {
        this.router.use(function timeLog(req, res, next) {
            next();
        });

        this.router.get('/', function (req, res) {
            res.send('Home page');
        });
    }

    loginRoutes() {
        this.router.post("/login", function (req, res) {
            AuthenticationController.login(req, res, function (err, user) {
                if (err) res.status(err.code).json(err.message);
                if (user != null)  res.status(200).json(user);
                else res.status(403).json("Incorrect login and/or password");
            });
        });

        this.router.get("/logout", function (req, res) {

        });
    }

    usersRoutes() {
        // get all the users
        this.router.get('/users', function (req, res) {
            UsersController.getUsers(req, res, function (err, users) {
                if (err) res.status(err.code).json(err.message);
                res.status(200).json(users);
            });
        });

        // Create new user
        this.router.post("/users", function (req, res) {
            // TODO
        });

        // Update user
        this.router.post("/users/:id", function (req, res) {
            // TODO
        });

        // Delete user
        this.router.delete("/users/:id", function (req, res) {
            // TODO
        });
    }
};


