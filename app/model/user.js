/**
 * MongoDB schema and model for the User entity.
 * @module UserModel
 * @requires mongoose
 */

// Import the mongoose module for MongoDB interaction
const mongoose = require("mongoose");

// Define the schema for the User entity
const UserSchema = new mongoose.Schema({
    // First name of the user
    first_name: { type: String },
    // Last name of the user
    last_name: { type: String },
    // Username for the user (required, unique, and converted to lowercase)
    username: { type: String, required: true, unique: true, lowercase: true },
    // Email address of the user (required, unique, and converted to lowercase)
    email: { type: String, required: true, unique: true, lowercase: true },
    // Password for the user (required)
    password: { type: String, required: true },
    // Token for authentication (default is an empty string)
    token: { type: String, default: "" },
    // Roles assigned to the user (default is ["USER"])
    roles: { type: [String], default: ["USER"] },
    // courses: {type: [mongoose.Types.ObjectId], ref: "course", default: []}
});

// Create and export the UserModel using the UserSchema
module.exports = {
    UserModel: mongoose.model("user", UserSchema)
};