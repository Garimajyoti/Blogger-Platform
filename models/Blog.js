import mongoose from "mongoose";

const Schema = mongoose.Schema;

const blogModal = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    creationDate: {
        type: Date,
        default: Date.now,
    },
    tags: [String], // Optional: You can add an array of tags
});

export default mongoose.model("Blog", blogModal);
