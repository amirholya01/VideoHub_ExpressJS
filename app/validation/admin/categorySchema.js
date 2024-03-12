const Joi = require("@hapi/joi");
const {MongoIdPattern} = require("../../util/constant");


const createCategorySchema = Joi.object({
    title: Joi.string().min(2).max(30).error(new Error("The category title is not correct")),
    parent: Joi.string().allow('').pattern(MongoIdPattern).error(new Error("The Id is not correct"))
});

const updateCategorySchema = Joi.object({
    title : Joi.string().min(2).max(30).error(new Error("The category title is not correct")),
});

module.exports = {
    createCategorySchema,
    updateCategorySchema
}