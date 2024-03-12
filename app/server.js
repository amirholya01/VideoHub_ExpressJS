const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

module.exports = class Application{

    #express = require("express");
    #app = this.#express();


    /**
     * Create a new Application.
     * @constructor
     * @param {number} PORT - Port number for server to listen on.
     * @param {string} DB_HOST - MongoDB host URL.
     */
    constructor(PORT, DB_HOST) {
        this.configApplication();
        this.createServer(PORT);
        this.connectToMongoDB(DB_HOST);
        this.createRoutes();
        this.errorHandler()
    }


    /**
     * Configure the Express application.
     */
    configApplication(){
        const path = require("path"); // Utility for working with file and directory paths
        this.#app.use(morgan("dev")); // HTTP request logging
        this.#app.use(this.#express.static(path.join("..", "..", "public"))); // Serve static files
        this.#app.use(this.#express.urlencoded({extended : true})); // Parse URL-encoded request bodies
        this.#app.use(this.#express.json()); // Parse incoming request bodies as JSON
        this.#app.use(cookieParser()); // Parse Cookie header and populate req.cookies
        this.#app.use(
            "/api-docs",
            swaggerUI.serve,
            swaggerUI.setup(
                swaggerJsDoc({
                    swaggerDefinition: {
                        openapi: "3.0.0",
                        info: {
                            title: "VideoHub",
                            version: "1.0.0",
                            description:
                                "Final Project - BackEnd - ExpressJS",
                            contact: {
                                name: "Amir Hossein Olyanasab Narab",
                                email: "amirholyanasabnarab@gmail.com",
                            },
                        },
                        servers: [
                            {
                                url: "http://localhost:4000",
                            },
                            {
                                url: "http://localhost:5000",
                            },
                        ],
                        components : {
                            securitySchemes : {
                                BearerAuth : {
                                    type: "http",
                                    scheme: "bearer",
                                    bearerFormat: "JWT",

                                }
                            }
                        },
                        security : [{BearerAuth : [] }]
                    },
                    apis: ["./app/router/**/*.js"],
                }),
                {explorer: true},
            )
        );
    }


    /**
     * Create HTTP server and listen for connections.
     * @param {number} PORT - Port number for server to listen on.
     */
    createServer(PORT){
        const http = require("http"); // HTTP server module
        const server = http.createServer(this.#app);
        // Start listening on specified port
        server.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`))
    }


    /**
     * Connect to MongoDB.
     * @param {string} DB_HOST - MongoDB host URL.
     */
    connectToMongoDB(DB_HOST){
        const mongoose = require("mongoose"); // MongoDB object modeling tool

        // Connect to MongoDB
        mongoose.connect(DB_HOST)
            .then(() => console.log(`Connecting to MongoDB was successfully`))
            .catch(err => console.log(`Connecting to MongoDB was failed ----- ${err}`))

        // Close MongoDB connection on SIGINT (Ctrl+C)
        process.on("SIGINT", async () => {
            await mongoose.connection.close();
            process.exit(0);
        });
    }


    /**
     * Define application routes.
     */
    createRoutes(){}


    /**
     * Error handling middleware.
     */
    errorHandler(){
        // 404 Not Found middleware
        this.#app.use((req, res, next) => {
            return res.status(404).json({
                status : 404,
                success : false,
                message : "The page or address  was not found"
            })
        })

        // Global error handler middleware
        this.#app.use((err, req, res, next)=>{

            const statusCode = err?.status || 500;
            const message = err?.message || "Internal Server Error";
            return res.status(statusCode).json({
                statusCode: statusCode,
                message: message
            })
        })
    }
}