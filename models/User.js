import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userModel = new Schema({
    username:{
        type: String,
        required : true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        minlength: 5
    },
    registrationDate: {
        type: Date,
        default: Date.now // Set the default value to the current date and time
    }
});

export default mongoose.model("User", userModel);