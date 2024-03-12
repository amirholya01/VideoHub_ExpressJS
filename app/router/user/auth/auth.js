// Importing the AuthController from the user/auth directory within controllers
const {AuthController} = require("../../../controller/user/auth/AuthController");

// Importing the expressValidatorMapper middleware for error handling
const {expressValidatorMapper} = require("../../../middleware/checkError");

const {registerValidator, loginValidator} = require("../../../validation/user/auth/auth");



// Importing the Router module from Express.js
const router = require("express").Router();

// Define routes for user authentication
/**
 * @swagger
 *  tags:
 *      name: Authentication
 */
// Route for user registration
/**
 * @swagger
 *  /user/register:
 *  post:
 *      summary: Register a new user
 *      tags: [Authentication]
 *      description: Register new user in our system
 *      parameters:
 *          -   name: username
 *              in: formData
 *              type: string
 *              required: true
 *          -   name: password
 *              in: formData
 *              type: password
 *              required: true
 *          -   name: confirm-password
 *              in: formData
 *              type: password
 *              required: true
 *          -   name: email
 *              in: formData
 *              type: string
 *              required: true
 *      responses:
 *          201:
 *              description : success -  registration was done successfully
 *          500:
 *              description: Registration was failed
 */
router.post("/register", registerValidator(), expressValidatorMapper, AuthController.register)

// Route for user login

/**
 * @swagger
 * /user/login:
 *  post:
 *      summary: login user
 *      tags: [Authentication]
 *      description: Login user in our system
 *      parameters:
 *          -   name: username
 *              in: formData
 *              type: string
 *              required: true
 *          -   name: password
 *              in: formData
 *              type: string
 *              required: true
 *      responses:
 *          201:
 *              description: Login was successfully
 *          500:
 *              description: Internal Server Error - Username or Password was wrong
 */
router.post("/login", loginValidator(), expressValidatorMapper, AuthController.login);

module.exports = {
    AuthRoutes : router
}