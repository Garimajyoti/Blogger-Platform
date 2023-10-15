import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoutes";
import blogRoute from "./routes/blogRoutes";
import commentRoutes from "./routes/commentRoutes";

const app = express();
app.use(express.json());
app.use("/api/user", userRoute);
app.use("/api/blog", blogRoute);
app.use("/api/comment", commentRoutes);
mongoose.connect("mongodb+srv://root:root@cluster0.0ts0l43.mongodb.net/test?retryWrites=true&w=majority")
.then(()=> app.listen(5000))
.then(()=>
console.log("Database is connected"))
.catch((err)=> console.log(err));

