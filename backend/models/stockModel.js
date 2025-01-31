import mongoose from "mongoose";

const { Schema } = mongoose;

const stockSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    stockImageUrl: {
      type: String,
      required: true,
    },
    stockDescription: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Stock = mongoose.model("Stock", stockSchema);

export default Stock;
