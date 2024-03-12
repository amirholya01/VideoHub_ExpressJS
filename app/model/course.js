// Importing mongoose library for MongoDB interactions
const mongoose = require("mongoose");

// Importing the CommentSchema from the comment file
const { CommentSchema } = require("./comment");

// Defining a schema for episodes
const Episodes = new mongoose.Schema({
    // title field representing the title of the episode, which is required
    title: { type: String, required: true },
    // text field representing the text content of the episode, which is required
    text: { type: String, required: true },
    // time field representing the duration of the episode, which is required
    time: { type: String, required: true },
    // videoAddress field representing the address of the video, which is required
    videoAddress: { type: String, required: true }
}, { toJSON: { virtuals: true } });

// Defining a virtual field for generating the video URL based on the video address
Episodes.virtual("videoURL").get(function () {
    return `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${this.videoAddress}`;
});

// Defining a schema for chapters
const Chapter = new mongoose.Schema({
    // title field representing the title of the chapter, which is required
    title: { type: String, required: true },
    // text field representing the text content of the chapter, which defaults to an empty string
    text: { type: String, default: "" },
    // episodes field representing the episodes within the chapter, which defaults to an empty array
    episodes: { type: [Episodes], default: [] }
});

// Defining a schema for courses
const CourseSchema = new mongoose.Schema({
    // title field representing the title of the course, which is required
    title: { type: String, required: true },
    // text field representing the text content of the course, which is required
    text: { type: String, required: true },
    // image field representing the image of the course, which is required
    image: { type: String, required: true },
    // tags field representing the tags associated with the course, which defaults to an empty array
    tags: { type: [String], default: [] },
    // category field representing the category of the course, referencing the 'category' collection and is required
    category: { type: mongoose.Types.ObjectId, ref: "category", required: true },
    // comments field representing the comments associated with the course, which defaults to an empty array
    comments: { type: [CommentSchema], default: [] },
    // teacher field representing the teacher of the course, referencing the 'user' collection and is required
    teacher: { type: mongoose.Types.ObjectId, ref: "user", required: true },
    // chapters field representing the chapters of the course, which defaults to an empty array
    chapters: { type: [Chapter], default: [] },
    // students field representing the students enrolled in the course, which defaults to an empty array
    //students: { type: [mongoose.Types.ObjectId], default: [], ref: "user" }
}, {
    // toJSON option for including virtual fields in JSON output
    toJSON: {
        virtuals: true
    }
});

// Exporting the CourseModel for use in other parts of the application
module.exports = {
    CourseModel: mongoose.model("course", CourseSchema)
}