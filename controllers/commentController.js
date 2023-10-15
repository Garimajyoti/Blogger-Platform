import Comment from "../models/Comments";

export const createComment = async (request, response) => {
    const { commenterName, commentText, blogPost } = request.body;

    const newComment = new Comment({
        commenterName,
        commentText,
        blogPost,
    });

    try {
        await newComment.save();
    } catch (err) {
        console.log(err);
        return response.status(500).json({ message: "Error creating the comment" });
    }

    return response.status(201).json({ newComment });
};

export const getCommentsByBlogPost = async (request, response) => {
    const blogPostId = request.params.blogPostId;

    try {
        const comments = await Comment.find({ blogPost: blogPostId });
        return response.status(200).json({ comments });
    } catch (err) {
        console.log(err);
        return response.status(500).json({ message: "Error fetching comments" });
    }
};