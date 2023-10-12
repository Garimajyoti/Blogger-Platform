import express from "express";
import { getAllBlogs, createBlog, updateBlog, deleteBlog } from "../controllers/blogController";

const blogRoute = express.Router();

blogRoute.get("/", getAllBlogs);
blogRoute.post("/create", createBlog);
blogRoute.put("/update/:id", updateBlog);
blogRoute.delete("/delete/:id", deleteBlog);  

export default blogRoute;
