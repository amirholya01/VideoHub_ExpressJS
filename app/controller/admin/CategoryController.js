// Import necessary modules and dependencies
const Controller = require("../Controller");  // Import the base controller
const {CategoryModel} = require("../../model/category");  // Import the CategoryModel for interacting with the database
const createError = require("http-errors");  // Import createError for generating HTTP errors
const {StatusCodes : HttpStatus} = require("http-status-codes");  //Import HTTP status codes for response handling
const {createCategorySchema} = require("../../validation/admin/categorySchema");  // Import validation schema for category creation
const mongoose = require("mongoose");

class CategoryController extends Controller{


    /**
     * Creates a new category.
     * @param {Request} req - Express request object.
     * @param {Response} res - Express response object.
     * @param {NextFunction} next - Express next middleware function.
     * @returns {Response} - HTTP response with the result.
     */
async createCategory(req, res, next){
    try {
        // Validate request body against schema
        await createCategorySchema.validateAsync(req.body);

        // Extract title and parent from request body
        const { title, parent } = req.body;

        // Convert empty string to null for parent field
        const parentValue = parent === "" ? null : parent;

        // Create category in the database
        const category = await CategoryModel.create({ title, parent: parentValue });

        // Check if category was created successfully
        if (!category) {
            // If category creation fails, throw internal server error
            throw createError.InternalServerError("Failed to create category");
        }

        // Respond with success message
        return res.status(HttpStatus.CREATED).json({
            statusCode: HttpStatus.CREATED,
            data: {
                statusCode: HttpStatus.CREATED,
                message: "Category created successfully"
            }
        });
    }catch (e) {
        next(e);
    }
}
}


module.exports = {
    CategoryController : new CategoryController()
}