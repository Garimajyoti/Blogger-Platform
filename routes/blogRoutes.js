import express from "express";
import { getAllBlogs, createBlog } from "../controllers/blogController";

const blogRoute = express.Router();

blogRoute.get("/", getAllBlogs);
blogRoute.post("/create", createBlog);

export default blogRoute;
