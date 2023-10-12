import express from "express";
import { getAllUsers, userLogin, userSignup } from "../controllers/userController";

const userRoute = express.Router();

userRoute.get("/", getAllUsers);
userRoute.post("/signup", userSignup);
userRoute.post("/login", userLogin);
export default userRoute;