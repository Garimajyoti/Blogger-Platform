import express from "express";
import mongoose from "mongoose";

const app = express();

mongoose.connect("mongodb+srv://root:root@cluster0.0ts0l43.mongodb.net/?retryWrites=true&w=majority")
.then(()=> app.listen(5000))
.then(()=>
console.log("Database is connected"))
.catch((err)=> console.log(err));

