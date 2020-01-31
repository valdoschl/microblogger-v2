const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    poster: {
      type: String,
      required: true
    },
    post: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Post", postSchema);
