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
const {tokenGenerator} = require("../../../module/tokenHelper");

const bcrypt = require("bcrypt");


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


    /**
     * Handles user login.
     * @param {object} req - The request object.
     * @param {object} res - The response object.
     * @param {function} next - The next function in the middleware chain.
     * @returns {object} - Returns a JSON response indicating success or failure.
     */
    async login(req, res, next){
        try {
            // Extracting username and password from the request body
            const {username, password} = req.body;

            // Finding a user with the provided username in the database
            const user = await UserModel.findOne({username}).select('_id username password');

            // If no user found, throw an error indicating incorrect username or password
            if(!user) throw {status : 401, message : "The username or password is incorrect"}

            // Comparing the provided password with the hashed password stored in the database
            const compareResult = bcrypt.compareSync(password, user.password);

            // If passwords don't match, throw an error indicating incorrect username or password
            if(!compareResult) throw {status : 401, message : "The username or password is incorrect"}

            // Generating a JWT token for the authenticated user
            const token = tokenGenerator(user);

            // Storing the generated token in the user object and saving it to the database
            user.token = token;

            await user.save();

            // Setting the JWT token as a cookie in the response
            res.cookie('jwt', token, {
                httpOnly: true, // Prevents JavaScript from accessing the cookie
                sameSite: 'none',  //Allows cross-site requests
                secure: true,  //Requires HTTPS connection to send the cookie
                maxAge: 3600000, //  Expiry time of 1 hour
            });

            // Sending a response with the token to the user
            return res.status(200).json({
                status: 200,
                success: true,
                message: "You have successfully logged in to your account.",
                token
            })
        }catch (e) {
            next(e);
        }
    }
}

module.exports = {
    AuthController : new AuthController()
}