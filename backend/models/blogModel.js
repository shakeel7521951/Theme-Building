import mongoose from "mongoose";

const { Schema } = mongoose;

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    coverImageUrl: {
      type: String,
      required: true,
      default: "",
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Technology",
        "Health",
        "Lifestyle",
        "Education",
        "Business",
        "Other",
      ], // Example categories
      default: "Other",
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
