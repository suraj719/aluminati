const News = require("../../models/NewsModel");

const getNews = async (req, res) => {
  try {
    const news = await News.find();
    res.status(200).json({
      message: "News retrieved successfully",
      success: true,
      news: news,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

const createNews = async (req, res) => {
  const { headline, content } = req.body;
  try {
    const newNews = new News({
      headline,
      content,
    });
    const savedNews = await newNews.save();
    res.status(201).json({
      news: savedNews,
      success: true,
    });
  } catch (error) {
    res.status(400).json({ message: error.message, success: false });
  }
};

module.exports = {
  getNews,
  createNews,
};
