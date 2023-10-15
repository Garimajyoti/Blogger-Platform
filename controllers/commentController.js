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

export const updateComment = async (request, response) => {
    const commentId = request.params.id;
    const { commentText } = request.body;

    try {
        const updatedComment = await Comment.findByIdAndUpdate(
            commentId,
            { commentText },
            { new: true }
        );

        if (!updatedComment) {
            return response.status(404).json({ message: "Comment cannot found" });
        }

        return response.status(200).json({ updatedComment });
    } catch (err) {
        console.log(err);
        return response.status(500).json({ message: "Error updating the comment" });
    }
};

export const deleteComment = async (request, response) => {
    const commentId = request.params.id;

    try {
        const deletedComment = await Comment.findByIdAndDelete(commentId);

        if (!deletedComment) {
            return response.status(404).json({ message: "Comment not found" });
        }

        return response.status(204).json(); // 204 indicates a successful delete with no content
    } catch (err) {
        console.log(err);
        return response.status(500).json({ message: "Error deleting the comment" });
    }
};
