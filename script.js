import mongoose from "mongoose";
import bcrypt from "bcryptjs"; 
import User from "./models/User.js";
import Blog from "./models/Blog.js";
import Comment from "./models/Comments.js";

mongoose.connect("mongodb+srv://root:root@cluster0.0ts0l43.mongodb.net/test?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const sampleUsers = [
  {
    username: "us1",
    email: "u1@example.com",
    password: "hashed_password_here1", 
  },
  {
    username: "us2",
    email: "u2@example.com",
    password: "hashed_password_here2", 
  },
];

const hashPasswords = async () => {
  for (const user of sampleUsers) {
    const saltRounds = 10; 
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    user.password = hashedPassword;
  }
};

const sampleBlogs = [
  {
    title: "Sample Blog 1",
    content: "This is a sample blog post about something interesting.",
    tags: ["tag1", "tag2"],
    author: undefined, 
  },
  {
    title: "Sample Blog 2",
    content: "Another sample blog post with different content.",
    tags: ["tag2", "tag3"],
    author: undefined, 
  },
];

const sampleComments = [
  {
    commenterName: "User1",
    commentText: "Great post!",
    blogPost: undefined, 
  },
  {
    commenterName: "User2",
    commentText: "I enjoyed reading this.",
    blogPost: undefined, 
  },
];


const populateDatabase = async () => {
  try {
    await hashPasswords();
    const users = await User.create(sampleUsers);

    sampleBlogs[0].author = users[0]._id;
    sampleBlogs[1].author = users[1]._id;

    const blogs = await Blog.create(sampleBlogs);

    sampleComments[0].blogPost = blogs[0]._id;
    sampleComments[1].blogPost = blogs[1]._id;

    await Comment.create(sampleComments);

    console.log("Data is populated in the database.");
  } catch (error) {
    console.error("Error populating the database:", error);
  } finally {
  
    mongoose.connection.close();
  }
};

populateDatabase();
