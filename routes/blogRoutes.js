import express from "express";
import { getAllBlogs, createBlog, updateBlog, deleteBlog, getAllBlogsFiltered } from "../controllers/blogController";

const blogRoute = express.Router();

blogRoute.get("/", getAllBlogs);
blogRoute.post("/create", createBlog);
blogRoute.put("/update/:id", updateBlog);
blogRoute.delete("/delete/:id", deleteBlog); 
blogRoute.get("/list", getAllBlogsFiltered);

export default blogRoute;
