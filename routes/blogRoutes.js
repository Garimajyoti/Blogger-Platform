import express from "express";
import { getAllBlogs, createBlog, updateBlog } from "../controllers/blogController";

const blogRoute = express.Router();

blogRoute.get("/", getAllBlogs);
blogRoute.post("/create", createBlog);
blogRoute.put("/update/:id", updateBlog); 

export default blogRoute;
