import mongoose from "mongoose";

const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User", // Referencing the User model
    },
    blogId: {
      type: Schema.Types.ObjectId,
      ref: "Blog", // Referencing the Blog model
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
