const { CourseController } = require("../../controller/admin/CourseController");

const router = require("express").Router();
/**
 * @swagger
 * /admin/category/list:
 *  get:
 *      tags: [Course(Admin-Panel)]
 *      summary: Get All Courses
 *      responses:
 *          200:
 *              description: success
 */
router.get("/list", CourseController.getAllCategories);

module.exports = {
  AdminApiCourseRouter: router,
};
