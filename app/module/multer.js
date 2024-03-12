// Import necessary modules

const multer = require("multer");
const path = require("path");
const fs = require("fs");
const createError = require("http-errors");


/**
 * Function to create directory structure for file uploads based on current date.
 * @param {Object} req - Express request object
 * @returns {string} - Directory path for file uploads
 */
function createRoute(req) {
    const date = new Date();
    const year = date.getFullYear().toString();
    const month = date.getMonth().toString();
    const day = date.getDate().toString();
    const directory = path.join(
        __dirname,
        "..",
        "..",
        "public",
        "uploads",
        "blogs",
        year,
        month,
        day
    );
    req.body.fileUploadPath = path.join("uploads", "blogs", year, month, day);
    fs.mkdirSync(directory, { recursive: true });
    return directory;
}

// Define storage configuration for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file?.originalname) {
            const filePath = createRoute(req);
            return cb(null, filePath);
        }
        cb(null, null);
    },
    filename: (req, file, cb) => {
        if (file.originalname) {
            const ext = path.extname(file.originalname);
            const fileName = String(new Date().getTime() + ext);
            req.body.filename = fileName;
            return cb(null, fileName);
        }
        cb(null, null);
    },
});


/**
 * File filter function to allow specific image formats for upload.
 * @param {Object} req - Express request object
 * @param {Object} file - File object
 * @param {function} cb - Callback function
 */
function fileFilter(req, file, cb) {
    const ext = path.extname(file.originalname);
    const mimetypes = [".jpg", ".jpeg", ".png", ".webp", ".gif"];
    if (mimetypes.includes(ext)) {
        return cb(null, true);
    }
    return cb(createError.BadRequest("The format of the image sent is not correct"));
}



/**
 * Video filter function to allow specific video formats for upload.
 * @param {Object} req - Express request object
 * @param {Object} file - File object
 * @param {function} cb - Callback function
 */
function videoFilter(req, file, cb) {
    const ext = path.extname(file.originalname);
    const mimetypes = [".mp4", ".mpg", ".mov", ".avi", ".mkv"];
    if (mimetypes.includes(ext)) {
        return cb(null, true);
    }
    return cb(createError.BadRequest("The video format sent is not correct"));
}

// Define maximum file sizes for picture and video uploads
const pictureMaxSize = 1 * 1000 * 1000;//1MB
const videoMaxSize = 300 * 1000 * 1000;//300MB

// Configure multer middleware for file and video uploads
const uploadFile = multer({ storage, fileFilter, limits: { fileSize: pictureMaxSize } });
const uploadVideo = multer({ storage, videoFilter, limits: { fileSize: videoMaxSize } });

// Export multer configurations for file and video uploads
module.exports = {
    uploadFile,
    uploadVideo
};