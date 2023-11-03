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
    country:{
        type: String,
        required: true,
    },
    creationDate: {
        type: Date,
        default: Date.now,
    },
    tags: [String], 
});

export default mongoose.model("Blog", blogModal);
