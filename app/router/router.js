const {IndexRoutes} = require("./api");
const router = require("express").Router();


router.use("/", IndexRoutes);


module.exports = {
    AllRoutes : router
}