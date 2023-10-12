import express from "express";
import { getAllUsers, userSignup } from "../controllers/userController";

const blogRouter = express.Router();

blogRouter.get("/", getAllUsers);
blogRouter.post("/signup", userSignup);
export default blogRouter;