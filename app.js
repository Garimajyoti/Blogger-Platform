import express from "express";
import mongoose from "mongoose";
import blogRouter from "./routes/userRoutes";

const app = express();
app.use(express.json());
app.use("/api/user", blogRouter);
mongoose.connect("mongodb+srv://root:root@cluster0.0ts0l43.mongodb.net/test?retryWrites=true&w=majority")
.then(()=> app.listen(5000))
.then(()=>
console.log("Database is connected"))
.catch((err)=> console.log(err));

