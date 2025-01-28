import Comment from "../models/commentsModel.js";
import User from "../models/userModel.js";

export const addComment = async (req, res) => {
  try {
    const blogId = req.params.id;
    const newComment = await Comment.create({
      content: req.body.content,
      blogId,
      author: req.id,
    });
    return res.status(201).json({
      success: true,
      message: "Comment added successfully.",
      comment: newComment,
    });
  } catch (error) {
    console.error("Error in adding comment:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to add comment.",
    });
  }
};

export const deleteComment = async (req, res) => {
  const commentId = req.params.id;
  const userId = req.id;

  try {
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized. User not found." });
    }

    if (user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Only admins can delete comments.",
      });
    }

    const comment = await Comment.findOne({ _id: commentId });

    if (!comment) {
      return res
        .status(404)
        .json({ success: false, message: "Comment not found." });
    }

    await Comment.deleteOne({ _id: commentId });

    return res
      .status(200)
      .json({ success: true, message: "Comment deleted successfully." });
  } catch (error) {
    console.error("Error in deleting comment:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to delete comment.",
    });
  }
};
