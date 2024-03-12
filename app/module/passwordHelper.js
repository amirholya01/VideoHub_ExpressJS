/**
 * Utility functions for hashing strings using bcrypt.
 * @module HashUtility
 * @requires bcrypt
 */

// Import the bcrypt module for password hashing
const bcrypt = require("bcrypt");

/**
 * Hashes a string using bcrypt.
 * @param {string} str - The string to be hashed.
 * @returns {string} The hashed string.
 */
function hashString(str) {
    // Generate a salt and hash the string synchronously
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(str, salt);
}

// Export the hashString function
module.exports = {
    hashString
};