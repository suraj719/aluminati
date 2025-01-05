const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
  {
    headline: { type: String, trim: true },
    content: { type: String, trim: true },
  },
  { timestamps: true }
);

const News = mongoose.model("News", newsSchema);

module.exports = News;
