const Controller = require("../../Controller");

class AuthController extends Controller{

    async register(req, res, next){
        try {

        }catch (e) {
            next(e);
        }
    }


    async login(req, res, next){
        try {

        }catch (e) {
            next(e);
        }
    }
}

module.exports = {
    AuthController : new AuthController()
}