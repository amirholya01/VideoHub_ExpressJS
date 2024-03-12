// Importing mongoose library for MongoDB interactions
const mongoose = require("mongoose");
const { CommentSchema } = require("./comment");

const CourseSchema = new mongoose.Schema({
    // title field representing the title of the course, which is required
    title: { type: String, required: true },
    // text field representing the text content of the course, which is required
    text: { type: String, required: true },
    // tags field representing the tags associated with the course, which defaults to an empty array
    tags: { type: [String], default: [] },
    // category field representing the category of the course, referencing the 'category' collection and is required
    category: { type: mongoose.Types.ObjectId, ref: "category", required: true },
    // comments field representing the comments associated with the course, which defaults to an empty array
    comments: { type: [CommentSchema], default: [] },
    likes: {type: [mongoose.Types.ObjectId], ref: "user", default : []},// Likes field representing the likes associated with the course, which defaults to an empty array
        // time field representing the duration of the course, which is required
    time: { type: String, required: true },
    // videoAddress field representing the address of the video, which is required
    videoAddress: { type: String, required: true }
},{toJSON : {virtuals: true}}
);

module.exports = {
    CourseModel : mongoose.model("course", CourseSchema)
}