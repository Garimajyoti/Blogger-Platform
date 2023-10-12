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

export const updateBlog = async (request, response) => {
    const blogId = request.params.id;
    const { title, content, tags } = request.body;

    try {
        const updatedBlog = await Blog.findByIdAndUpdate(
            blogId,
            {
                title,
                content,
                tags,
            },
            { new: true }
        );

        if (!updatedBlog) {
            return response.status(404).json({ message: "Blog post not found" });
        }

        return response.status(200).json({ updatedBlog });
    } catch (err) {
        console.log(err);
        return response.status(500).json({ message: "Error updating the blog post" });
    }
};

export const deleteBlog = async (request, response) => {
    const blogId = request.params.id;

    try {
        const deletedBlog = await Blog.findByIdAndDelete(blogId);

        if (!deletedBlog) {
            return response.status(404).json({ message: "Blog post not found" });
        }

        return response.status(204).json(); // 204 indicates a successful delete with no content
    } catch (err) {
        console.log(err);
        return response.status(500).json({ message: "Error deleting the blog post" });
    }
};

