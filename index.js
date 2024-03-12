/**
 * Entry point for starting the server.
 * @module ServerEntry
 * @requires dotenv
 * @requires Application
 */

// Load environment variables from a .env file into process.env
require("dotenv").config();

// Import the Application class from the server module
const Application = require("./app/server");

// Retrieve port and MongoDB host from environment variables
const PORT = process.env.PORT;  // Port number for the server to listen on
const DB_HOST = process.env.DB_HOST;  // MongoDB host URL

// Create a new instance of the Application class with the specified PORT and DB_HOST
new Application(PORT, DB_HOST);