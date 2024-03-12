const { AdminApiCategoryRouter} = require("./category");
const {AdminApiBlogRouter} = require("./blog");
const router = require("express").Router();

/**
 * @swagger
 *  tags:
 *     -    name: Admin-Panel
 *          description: all methods and routes for course
 *     -    name: Category(Admin-Panel)
 *          description: all methods and routes for category
 *     -    name: Blog(Admin-Panel)
 *          description: All methods and routes for blog
 */
router.use("/category", AdminApiCategoryRouter);
router.use("/blog", AdminApiBlogRouter);

module.exports = {
    AdminApiRoutes : router
}