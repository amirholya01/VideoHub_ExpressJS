/**
 * Controller for handling requests related to the home page.
 * @module HomeController
 * @extends Controller
 */


// Import the base Controller class
const Controller = require("../Controller");



// Define the HomeController class extending the Controller class
class HomeController extends Controller{
    /**
     * Handle GET request for the home page.
     * @param {object} req - The Express request object.
     * @param {object} res - The Express response object.
     * @param {function} next - The Express next middleware function.
     * @returns {object} The response JSON object.
     */

    indexPage(req, res, next){
        try {
            // Send a welcome message as JSON response
            return res.status(200).json({
                statusCode: 200,
                message: "Welcome to home page...."
            })
        } catch (error) {
            // Pass any errors to the next middleware
            next(error);
        }
    }
}

// Export an object containing an instance of the HomeController
module.exports = {
    HomeController : new HomeController()
}