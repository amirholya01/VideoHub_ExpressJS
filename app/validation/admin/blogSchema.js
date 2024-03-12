const Joi = require("@hapi/joi");
const createError = require("http-errors");
const { MongoIDPattern } = require("../../util/constant");
const createBlogSchema = Joi.object({
    title : Joi.string().min(3).max(30).error(createError.BadRequest("Title of blog was not correct")),
    description: Joi.string().error(createError.BadRequest("Sending text was not correct")),
    filename: Joi.string().pattern(/(\.png|\.jpg|\.webp|\.jpeg|\.gif)$/).error(createError.BadRequest("Sending image was not correct")),
    tags: Joi.array().min(0).max(20).error(createError.BadRequest("Tags can not be more than 20")),
    category: Joi.string().pattern(MongoIDPattern).error(createError.BadRequest("The desired category was not found")),
    fileUploadPath : Joi.allow()
});

module.exports = {
    createBlogSchema
}