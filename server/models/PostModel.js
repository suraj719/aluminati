const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    user: {
      name: { type: String, trim: true },
      id: { type: String, trim: true },
      headline: { type: String, trim: true },
      profilePicture: { type: String, trim: true },
    },
    content: { type: String, trim: true },
    image: { type: String, trim: false },
    likes: { type: Number, default: 0 },
    comments: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
