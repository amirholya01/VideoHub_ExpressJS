module.exports = class Application{

    #express = require("express");
    #app = this.#express();

    constructor(PORT, DB_HOST) {
    }

    configApplication(){}

    createServer(PORT){}

    connectToMongoDB(DB_HOST){}

    createRoutes(){}

    errorHandler(){}
}