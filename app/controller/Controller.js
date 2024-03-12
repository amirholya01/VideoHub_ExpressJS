/**
 * Base Controller class for Express.js controllers.
 * @module Controller
 * @requires auto-bind
 */

// Import the auto-bind module
const autoBind = require('auto-bind');


// Export the Controller class
module.exports = class Controller{

    /**
     * Create a new Controller instance.
     * Automatically binds methods to the instance.
     * @constructor
     */
    constructor() {
        // Automatically bind methods to the instance
        autoBind(this)
    }
}