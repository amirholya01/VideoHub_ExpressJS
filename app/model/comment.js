// Importing mongoose library for MongoDB interactions
const mongoose = require("mongoose");

// Defining the schema for comments
const CommentSchema = new mongoose.Schema({
    // user field representing the user who made the comment, referencing the 'user' collection
    user: {type: mongoose.Types.ObjectId, ref: "user", required: true},
    // comment field representing the actual comment, which is a string and is required
    comment: {type: String, required: true},
    // createAt field representing the creation date of the comment, defaulting to the current time
    createAt: {type: Date, default: new Date().getTime()},
    // parent field representing the parent comment if this is a reply, referencing the 'comment' collection
    parent: {type: mongoose.Types.ObjectId, ref: "comment"}
});

// Exporting the CommentSchema for use in other parts of the application
module.exports = {
    CommentSchema
}