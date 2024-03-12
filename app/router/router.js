const {IndexRoutes} = require("./api");
const {UserRoutes} = require("./user/user");
const router = require("express").Router();

router.use(UserRoutes);
router.use("/", IndexRoutes);


module.exports = {
    AllRoutes : router
}