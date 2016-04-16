/**
 * Created by pierre on 14/04/16.
 */

// Imports
var router = require('express').Router();
var AuthenticationController = require("./../controllers/AuthenticationController");
var UsersController = require("./../controllers/UsersController");

// middleware specific to this router
router.use(function timeLog(req, res, next) {
    next();
});

// define the home page route
router.get('/', function (req, res) {
    res.send('Home page');
});

// -------------------- LOGIN ----------------------

// Login
router.post("/login", function (req, res) {
    AuthenticationController.login(req, res, function (err, user) {
        if (err) res.status(err.code).json(err.message);
        if (user != null)  res.status(200).json(user);
        else res.status(403).json("Incorrect login and/or password");
    });
});

// Logout
router.get("/logout", function (req, res) {
    // TODO
});

// ------------------ USERS ------------------------

// get all the users
router.get('/users', function (req, res) {
    UsersController.readUsers(req, res, function (err, users) {
        if (err) res.status(err.code).json(err.message);
        res.status(200).json(users);
    });
});

// Create new user
router.post("/users", function (req, res) {
    // TODO
});

// Update user
router.post("/users/:id", function (req, res) {
    // TODO
});

// Delete user
router.delete("/users/:id", function (req, res) {
    // TODO
});

// ------------------------------------------



module.exports = router;