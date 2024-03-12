/**
 * Router configuration for API endpoints related to the home page.
 * @module IndexRoutes
 * @requires HomeController
 * @requires express.Router
 */

// Import the HomeController for handling home page requests
const {HomeController} = require("../../controller/api/HomeController");


// Import the express Router module
const router = require("express").Router();


// Define routes for the home page
/**
 * @swagger
 * tags:
 *  name: IndexPage
 *  description: Index page and routes
 */
/**
 * @swagger
 * /:
 *  get:
 *      summary: Index of routes
 *      tags: [IndexPage]
 *      description: get all index methods
 *      responses:
 *          200:
 *              description: success
 *          404:
 *              description: not found
 *
 */
router.get("/", HomeController.indexPage);


// Export an object containing the router configuration
module.exports = {
    IndexRoutes : router
}