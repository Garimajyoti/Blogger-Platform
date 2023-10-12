import express from "express";
import { getAllUsers, userLogin, userSignup } from "../controllers/userController";

const blogRouter = express.Router();

blogRouter.get("/", getAllUsers);
blogRouter.post("/signup", userSignup);
blogRouter.post("/login", userLogin);
export default blogRouter;