import User from "../models/userModel.js";
import Blog from "../models/blogModel.js";
import Comment from "../models/commentsModel.js";

export const addBlog = async (req, res) => {
  const userId = req.id;
  const { title, body, category } = req.body;

  try {
    const allowedCategories = [
      "Technology",
      "Health",
      "Lifestyle",
      "Education",
      "Business",
      "Other",
    ];
    if (!allowedCategories.includes(category)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid category." });
    }

    const newBlog = await Blog.create({
      title,
      body,
      category,
      createdBy: userId,
      coverImageUrl: req.file ? `/uploads/${req.file.filename}` : "",
    });

    return res.status(201).json({ success: true, blog: newBlog });
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json({ success: false, message: "Failed to add blog." });
  }
};

export const getBlog = async (req, res) => {
  const userId = req.id;
  const blogId = req.params.id;
  try {
    const user = await User.findOne({ _id: userId });
    const blog = await Blog.findOne({ _id: blogId }).populate("createdBy");
    const comments = await Comment.find({ blogId }).populate("author");

    return res.status(200).json({
      success: true,
      user: user || null,
      blog,
      comments,
    });
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch blog details." });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate("createdBy", "fullName email")
      .populate({
        path: "comments",
        populate: { path: "author", select: "fullName email" },
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      blogs,
    });
  } catch (error) {
    console.error("Error fetching blogs:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch blogs.",
    });
  }
};

export const delBlog = async (req, res) => {
  const userId = req.id;
  const blogId = req.params.id;

  try {
    const blog = await Blog.findOne({ _id: blogId });
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({
        message: "Not Logged In",
        success: false,
      });
    }

    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found." });
    }

    // if (user.role !== "admin") {
    //   return res.status(403).json({
    //     success: false,
    //     message: "Access denied. Only admins can delete comments.",
    //   });
    // }

    await Blog.deleteOne({ _id: blogId });
    await Comment.deleteMany({ blogId });

    return res.status(200).json({
      success: true,
      message: "Blog and associated comments deleted successfully.",
    });
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json({ success: false, message: "Failed to delete blog." });
  }
};
export const updateBlog = async (req, res) => {
  const userId = req.id;
  const blogId = req.params.id;
  const { title, body, category } = req.body;

  try {
    const blog = await Blog.findById(blogId);
    const user = await User.findById(userId);

    if (!user) {
      return res.status(401).json({ success: false, message: "Not Logged In" });
    }

    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found." });
    }

    if (
      user._id.toString() !== blog.createdBy.toString() &&
      user.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ success: false, message: "Access denied." });
    }

    // Validate category
    const allowedCategories = [
      "Technology",
      "Health",
      "Lifestyle",
      "Education",
      "Business",
      "Other",
    ];
    if (category && !allowedCategories.includes(category)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid category." });
    }

    // Update fields dynamically
    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $set: {
          ...(title && { title }),
          ...(body && { body }),
          ...(category && { category }),
          ...(req.file && { coverImageUrl: `/uploads/${req.file.filename}` }),
        },
      },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      success: true,
      message: "Blog updated successfully.",
      blog: updatedBlog,
    });
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json({ success: false, message: "Failed to update blog." });
  }
};
