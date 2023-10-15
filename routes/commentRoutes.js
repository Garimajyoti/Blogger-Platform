import express from "express";
import {
    createComment,
    getCommentsByBlogPost,
    updateComment,
    deleteComment,
} from "../controllers/commentController";

const commentRouter = express.Router();

commentRouter.post("/create", createComment);
commentRouter.get("/blogpost/:blogPostId", getCommentsByBlogPost);
commentRouter.put("/update/:id", updateComment);
commentRouter.delete("/delete/:id", deleteComment);

export default commentRouter;
