/**
 * MongoDB schema and model for the Category entity.
 * @module CategoryModel
 * @requires mongoose
 */

// Import the mongoose module for MongoDB interaction
const mongoose = require("mongoose");

// Define the schema for the Category entity
const CategorySchema = new mongoose.Schema({
    // Title of the category
    title: { type: String, required: true },
    // Parent category ID (reference to Category entity)
    parent: { type: mongoose.Types.ObjectId, ref: "category", default: null }
},{
    // Disabling default 'id' virtual field
    id: false,
    // Configuring schema to include virtual fields in JSON output
    toJSON: {
        virtuals: true
    }
});

// Defining a virtual field for 'children' which references Category entity
CategorySchema.virtual("children", {
    ref: "category",
    localField: "_id",
    foreignField: "parent"
});

// Middleware function to automatically populate 'children' field before 'findOne' and 'find' operations
function autoPopulate(next) {
    this.populate([{ path: "children", select: { __v: 0, id: 0 } }]);
    next();
}
CategorySchema.pre('findOne', autoPopulate).pre("find", autoPopulate);

// Create and export the CategoryModel using the CategorySchema
module.exports = {
    CategoryModel: mongoose.model("category", CategorySchema)
};
