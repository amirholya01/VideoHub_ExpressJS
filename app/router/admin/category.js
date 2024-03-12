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

/**
 * @swagger
 * /admin/category/parents:
 *  get:
 *      tags: [Category(Admin-Panel)]
 *      summary: Get all categories that are header
 *      responses:
 *          200:
 *              description: success
 *          500:
 *              description: Internal Server Error
 */
router.get("/parents", CategoryController.getAllParents);

/**
 * @swagger
 * /admin/category/children/{parent}:
 *  get:
 *      tags: [Category(Admin-Panel)]
 *      summary: Get all categories that includes children
 *      parameters:
 *          -   in: path
 *              name: parent
 *              type: string
 *              required: true
 *      responses:
 *          200:
 *              description: success
 *          500:
 *              description: Internal Server Error
 */
router.get("/children/:parent", CategoryController.getChildernOfParents)


/**
 * @swagger
 * /admin/category/all:
 *  get:
 *      tags: [Category(Admin-Panel)]
 *      summary: Get all categories
 *      responses:
 *          200:
 *              description: success
 *          500:
 *              description: Internal Server Error
 */
router.get("/all", CategoryController.getAllCategories);

/**
 * @swagger
 * /admin/category/list-of-all:
 *  get:
 *      tags: [Category(Admin-Panel)]
 *      summary: get all categories without populate and nested structure
 *      responses:
 *          200:
 *              description: success
 */
router.get("/list-of-all", CategoryController.getAllCategoryWithoutPopulate);

/**
 * @swagger
 * /admin/category/remove/{id}:
 *  delete:
 *      tags: [Category(Admin-Panel)]
 *      summary: remove category with object-id
 *      parameters:
 *          -   in: path
 *              name: id
 *              type: string
 *              required: true
 *      responses:
 *          200:
 *              description: success - Category was deleted successfully
 *          500:
 *              description: Internal Server Error
 */
router.delete("/remove/:id", CategoryController.removeCategory);

/**
 * @swagger
 * /admin/category/{id}:
 *  get:
 *      tags: [Category(Admin-Panel)]
 *      summary: Get a category by object-id
 *      parameters:
 *          -   in: path
 *              name: id
 *              type: string
 *              required: true
 *      responses:
 *          200:
 *              description: success - a category was found successfully
 */
router.get("/:id", CategoryController.getCategoryById);


/**
 * @swagger
 * /admin/category/update/{id}:
 *  patch:
 *      tags: [Category(Admin-Panel)]
 *      summary: edit category - update category by object-id
 *      parameters:
 *          -   in: path
 *              name: id
 *              type: string
 *              required: true
 *          -   in: formData
 *              name: title
 *              type: string
 *              required: true
 *      responses:
 *          200:
 *              description: success
 *          500:
 *              description: internal server error
 *
 */
router.patch("/update/:id", CategoryController.editCategory);

module.exports = {
    AdminApiCategoryRouter : router
}