const {CategoryController} = require("../../controller/admin/CategoryController");
const router = require("express").Router();
/**
 * @swagger
 * /admin/category/create:
 *  post:
 *      tags: [Category(Admin-Panel)]
 *      summary: Create a new category
 *      parameters:
 *          -   in: formData
 *              type: string
 *              required: true
 *              name: title
 *          -   in: formData
 *              type: string
 *              name: parent
 *      responses:
 *          201:
 *              description: success - Create a new category was done successfully
 *
 */
router.post("/create", CategoryController.createCategory);

module.exports = {
    AdminApiCategoryRouter : router
}