const {IndexRoutes} = require("./api");
const {UserRoutes} = require("./user/user");
const {AdminApiRoutes} = require("./admin/admin");
const router = require("express").Router();

router.use("/admin", AdminApiRoutes);
router.use(UserRoutes);
router.use("/", IndexRoutes);


module.exports = {
    AllRoutes : router
}