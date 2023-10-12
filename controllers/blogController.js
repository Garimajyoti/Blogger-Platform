import Blog from "../models/Blog";

export const getAllBlogs = async (request, response) => {
    let allBlogs;
    try {
        allBlogs = await Blog.find();
    } catch (err) {
        console.log(err);
    }
    if (!allBlogs) {
        return response.status(404).json({ message: "No blog posts found" });
    }
    return response.status(200).json({ allBlogs });
};

export const createBlog = async (request, response) => {
    const { title, content, author, tags } = request.body;

    const newBlog = new Blog({
        title,
        content,
        author,
        tags,
    });

    try {
        await newBlog.save();
    } catch (err) {
        return console.log(err);
    }
    return response.status(201).json({ newBlog });
};


