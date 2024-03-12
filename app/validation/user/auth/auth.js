// Import the Express-validator's body function for request body validation
const {body} = require("express-validator");

// Import the UserModel for querying user data
const {UserModel} = require("../../../model/user");

/**
 * Validates user registration data.
 * @returns {Array} Array of validation middleware functions.
 */
function registerValidator(){
    return [
        // Validate username
        body("username").custom(async (value, ctx) => {
            if (value) {
                const userRegex = /^[a-z]+[a-z0-9]{3,}/gi;

                if (userRegex.test(value)) {
                    const user = await UserModel.findOne({ username: value });
                    if (user) throw "The username is already in use.";
                    return true;
                }
                return "This username is not allowed.";
            } else {
                throw "The username cannot be empty.";
            }
        }),
        // Validate email
        body("email").isEmail().withMessage("This email is not allowed.")
            .custom(async email => {
                const user = await UserModel.findOne({ email });
                if (user) throw "The email is already in use.";
                return true;
            }),
        // Validate password
        body("password").isLength({ min: 6, max: 16 }).withMessage("The password must be between 6 and 16 characters.")
            .custom((value, ctx) => {
                if (!value) throw "The password cannot be empty.";
                return true;
            })
    ]
}

/**
 * Defines validation rules for the login endpoint using express-validator middleware.
 * @returns {Array} - An array of validation middleware functions.
 */
function loginValidator(){

    // Define validation rules for username and password using express-validator middleware
    return [
        // Validate username field
        body("username").notEmpty().withMessage("username shouldn't be empty") // Check if username is not empty

            .custom(username => {  // Custom validation for username format
                const usernameRegex = /^[a-z]+[a-z0-9]{3,}/gi  // Regular expression for username format
                if(usernameRegex.test(username)){  // Check if username matches the regex pattern
                    return true  // If username format is valid, return true
                }
                throw "wrong user name, please try again"  // If username format is invalid, throw an error
            }),


        // Validate password field
        body("password").isLength({min : 6, max : 16}).withMessage("The password should at least be between 6 and 16 characters")// Check password length
    ]

}


module.exports = {
    registerValidator,
    loginValidator
}