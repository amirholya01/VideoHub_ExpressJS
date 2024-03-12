const { AdminApiCategoryRouter} = require("./category");
const router = require("express").Router();

/**
 * @swagger
 *  tags:
 *     -    name: Admin-Panel
 *          description: all methods and routes for course
 *     -    name: Category(Admin-Panel)
 *          description: all methods and routes for category
 */
router.use("/category", AdminApiCategoryRouter);

module.exports = {
    AdminApiRoutes : router
}