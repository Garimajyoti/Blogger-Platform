import mongoose from "mongoose";

const Schema = mongoose.Schema;

const commentModal = new Schema({
    commenterName: {
        type: String,
        required: true,
    },
    commentText: {
        type: String,
        required: true,
    },
    creationDate: {
        type: Date,
        default: Date.now,
    },
    blogPost: {
        type: Schema.Types.ObjectId,
        ref: "Blog",
        required:true,
    },
});

export default mongoose.model("Comments", commentModal);
