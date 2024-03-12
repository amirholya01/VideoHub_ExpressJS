/**
 * Middleware function to map Express-validator validation results to response messages.
 * @module ExpressValidatorMapper
 * @requires express-validator/validationResult
 */

// Import the validationResult function from express-validator for accessing validation results
const { validationResult } = require("express-validator");

/**
 * Maps Express-validator validation results to response messages.
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @param {function} next - The Express next middleware function.
 * @returns {void}
 */
function expressValidatorMapper(req, res, next) {
    // Object to store validation error messages
    let messages = {};

    // Retrieve validation result from the request
    const result = validationResult(req);

    // Reset messages object
    messages = {};

    // Check if there are validation errors
    if (result?.errors?.length > 0) {
        // Iterate through validation errors and add them to the messages object
        result?.errors.forEach((err) => {
            messages[err.param] = err.msg;
        });
        // Return validation error messages in the response
        return res.status(400).json({
            status: 400,
            messages
        });
    }
    // Proceed to the next middleware if no validation errors
    next();
}

// Export the expressValidatorMapper function
module.exports = {
    expressValidatorMapper
};