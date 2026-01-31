const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 200,
    },
    content: {
      type: String,
      required: true,
      minlength: 10,
    },
    excerpt: {
      type: String,
      maxlength: 300,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    featuredImage: {
      type: String,
      default: "default-post-image.jpg",
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

postSchema.index({ title: "text", content: "text" });
postSchema.index({ author: 1, createdAt: -1 });

let POST = mongoose.model("post", postSchema);
module.exports = POST;