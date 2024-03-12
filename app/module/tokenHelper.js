// Importing the jsonwebtoken library for handling JWTs
const jwt = require("jsonwebtoken");


/**
 * Generates a JWT token for a given user.
 * @param {Object} user - The user object for whom the token is generated.
 * @returns {string} - The JWT token.
 */


function tokenGenerator(user){

    // Creating a payload containing user information to be encoded in the token
    const payload = {
        _id: user._id,
        username: user.username
    };

    // Generating a JWT token with the payload, using the provided SECRET_KEY and expiration time from environment variables
    const token = jwt.sign(
        payload,  // Data to be encoded in the token
        process.env.SECRET_KEY,  // Secret key used for encoding
        {expiresIn: process.env.JWT_EXPIRES_IN}  // Expiration time for the token
    );

    // Returning the generated token
    return token;
}



module.exports = {
    tokenGenerator
}