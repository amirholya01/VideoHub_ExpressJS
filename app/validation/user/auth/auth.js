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



module.exports = {
    registerValidator
}