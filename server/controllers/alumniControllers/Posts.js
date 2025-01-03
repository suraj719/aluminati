const Post = require("../../models/PostModel");
const uploadToS3 = require("../../util/AWSUpload");

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json({
      message: "Posts retrieved successfully",
      success: true,
      posts: posts,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong!",
      success: false,
    });
  }
};

const createPost = async (req, res) => {
  const { name, headline, profilePicture, content, createdBy } = req.body;
  const file = req.file;
  try {
    const imgUrl = file ? await uploadToS3(file) : null;
    const newPost = new Post({
      user: {
        name,
        id: createdBy,
        profilePicture,
      },
      headline,
      content,
      image: imgUrl,
    });
    const savedPost = await newPost.save();
    res.status(201).json({
      post: savedPost,
      success: true,
    });
  } catch (error) {
    res.status(400).json({ message: error.message, success: false });
  }
};

module.exports = {
  getPosts,
  createPost,
};
