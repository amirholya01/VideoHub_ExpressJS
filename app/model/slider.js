/**
 * MongoDB schema and model for the Slider entity.
 * @module SliderModel
 * @requires mongoose
 */

// Import the mongoose module for MongoDB interaction
const mongoose = require("mongoose");

// Define the schema for the Slider entity
const SliderSchema = new mongoose.Schema({
    // Title of the slider item
    title: { type: String },
    // Text content of the slider item
    text: { type: String },
    // Image URL for the slider item (required)
    image: { type: String, required: true }
});

// Create and export the SliderModel using the SliderSchema
module.exports = {
    SliderModel: mongoose.model("slider", SliderSchema)
};
