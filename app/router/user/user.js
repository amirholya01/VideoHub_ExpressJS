const { AuthRoutes } = require("./auth/auth");

const router = require("express").Router();

router.use("/user", AuthRoutes);

module.exports = {
    UserRoutes : router
}