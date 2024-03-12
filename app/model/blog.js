
/**
 * MongoDB schema and model for the Blog entity.
 * @module BlogModel
 * @requires mongoose
 */


// Import the mongoose module for MongoDB interaction
const mongoose = require("mongoose");


// Define the schema for the Blog entity
const BlogSchema = new mongoose.Schema({
    // Author ID for the blog post (reference to User entity)
    auther: {type: mongoose.Types.ObjectId, required: true},

    // Title of the blog post
    title: {type: String, required: true},

    // Description or content of the blog post
    description: {type: String, required: true},

    // URL of the image associated with the blog post
    image: {type: String, required: true},

    // Tags associated with the blog post
    tags: {type: [String], default: []},

    // Categories associated with the blog post (reference to Category entity)
    category: {type: [mongoose.Types.ObjectId], default: []},
    likes: {type: [mongoose.Types.ObjectId], default: []}
},{
    // Timestamps for createdAt and updatedAt fields
    timestamps: true,
    // Disabling versioning
    versionKey: false
})


// Create and export the BlogModel using the BlogSchema
module.exports = {
    BlogModel : mongoose.model("blog", BlogSchema)
}