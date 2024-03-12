const Controller = require("../Controller");

class CourseController extends Controller{
    async getAllCategories(req, res, next){
        try {
            return res.json({});
        } catch (error) {
            next(error);
        }
    }
}

module.exports = {
    CourseController : new CourseController()
}