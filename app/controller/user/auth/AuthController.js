/**
 * Controller for handling user authentication related operations.
 * @module AuthController
 * @extends Controller
 * @requires Controller
 * @requires hashString
 * @requires UserModel
 */

// Import the base Controller class
const Controller = require("../../Controller");
// Import the hashString function from passwordHelper module
const {hashString} = require("../../../module/passwordHelper")

// Import the UserModel for interacting with user data
const {UserModel} = require("../../../model/user");


// Define the AuthController class extending the base Controller class
class AuthController extends Controller{



    /**
     * Handles user registration.
     * @async
     * @param {object} req - The Express request object.
     * @param {object} res - The Express response object.
     * @param {function} next - The Express next middleware function.
     * @returns {object} The response JSON object containing user data.
     */
    async register(req, res, next){
        try {
            // Extract username, password, confirmPassword, and email from request body
            const {username, password, confirmPassword, email} = req.body;

            // Hash the password using the hashString function
            const hash_Password = hashString(password);

            // Create a new user record in the database
            const user = await UserModel.create({username, password: hash_Password, confirmPassword, email})
                .catch(err => {
                    // Handle duplicate username error
                    if(err?.code === 11000){
                        throw {status: 400, message: "The username already has used"}
                    }
                })
            // Return the user data as JSON response
            return res.json(user); // Pass any errors to the next middleware
        }catch (e) {
            next(e);
        }
    }


    async login(req, res, next){
        try {

        }catch (e) {
            next(e);
        }
    }
}

module.exports = {
    AuthController : new AuthController()
}