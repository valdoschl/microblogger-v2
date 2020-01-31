const express = require("express");
const checkAuth = require("../middleware/check-auth");
const Post = require("../models/post");
const router = express.Router();

/*
    Route: GET posts/
    -Find and send all posts from database as response
    -private accesss
*/
router.get("/", checkAuth, (req, res) => {
  Post.find()
    .sort({ _id: -1 })
    .then(posts =>
      res.status(200).json({ loggedUser: req.userData.username, posts })
    )
    .catch(err => {
      console.log(err);
      res.status(400).json({
        error: err
      });
    });
});

/*
    Route: POST posts/
    -Create new posts to database
    -private accesss
*/
router.post("/", checkAuth, (req, res) => {
  const newPost = new Post({
    post: req.body.post,
    poster: req.userData.username
  });
  newPost
    .save()
    .then(() =>
      res.status(200).json({
        message: "Post added"
      })
    )
    .catch(err => {
      console.log(err);
      res.status(400).json({
        error: err
      });
    });
});

module.exports = router;
