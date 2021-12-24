const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");

// @route   POST api/posts
// @desc    Create a post
// @access  Private
router.post(
  "/",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");

      const newPost = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };

      const post = new Post(newPost);
      await post.save();
      res.json(post);
    } catch (err) {
      console.log(err);
      res.status(500).send("Server error");
    }
  }
);

// @route   GET api/posts
// @desc    Get all posts
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    let posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

// @route   GET api/posts/:post_id
// @desc    Get post by id
// @access  Public
router.get("/:post_id", auth, async (req, res) => {
  try {
    let post = await Post.findById(req.params.post_id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    res.json(post);
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({
        message: "Post not found",
      });
    }
    console.log(err);
    res.status(500).send("Server error");
  }
});

// @route   DELETE api/posts/:post_id
// @desc    Delete post by id
// @access  Private
router.delete("/:post_id", auth, async (req, res) => {
  try {
    let post = await Post.findById(req.params.post_id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({
        message: "User not authorized",
      });
    }

    await Post.findByIdAndDelete(req.params.post_id);
    // or ===> post.remove()

    res.json(post);
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({
        message: "Post not found",
      });
    }
  }
});

// @route   PUT api/posts/like/:post_id
// @desc    Like post
// @access  Private
router.put("/like/:post_id", auth, async (req, res) => {
  try {
    let post = await Post.findById(req.params.post_id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    if (post.user.toString() === req.user.id) {
      return res.status(401).json({
        message: "You can not like your own posts",
      });
    }

    // Check if the post has already been liked
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      const index = post.likes
        .map((like) => like.user.toString())
        .indexOf(req.user.id);

      post.likes.splice(index, 1);

      await post.save();
      return res.status(200).json({
        message: "You return your like from this post",
        likes: post.likes,
      });
    } else {
      post.likes.unshift({
        user: req.user.id,
      });

      await post.save();
      return res.status(200).json({
        message: "You liked this post",
        likes: post.likes,
      });
    }
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({
        message: "Post not found",
      });
    }
  }
});

// @route   PUT api/posts/comment/:post_id
// @desc    Comment post
// @access  Private
router.post(
  "/comment/:post_id",
  [auth, [check("comment", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let post = await Post.findById(req.params.post_id);
      let user = await User.findById(req.user.id).select("-password");

      if (!post) {
        return res.status(404).json({
          message: "Post not found",
        });
      }

      const { comment } = req.body;

      let newComment = {
        user: user.id,
        comment: comment,
        name: user.name,
        avatar: user.avatar,
      };

      post.comments.unshift(newComment);

      await post.save();

      return res.status(200).json({
        message: "Comment was successfully added",
        comments: post.comments,
      });
    } catch (err) {
      if (err.kind === "ObjectId") {
        return res.status(404).json({
          message: "Post not found",
        });
      }
    }
  }
);

// @route   DELETE api/posts/comment/:post_id/:comment_id
// @desc    Delete comment
// @access  Private
router.delete("/comment/:post_id/:comment_id", auth, async (req, res) => {
  try {
    let post = await Post.findById(req.params.post_id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    // Either comment exist or not
    if (!comment) {
      return res.status(404).json({
        message: "Comment does not exist",
      });
    }

    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({
        message: "User not authorized",
      });
    }

    const index = post.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);

    post.comments.splice(index, 1);

    await post.save();

    return res.status(200).json({
      message: "Comment was successfully deleted",
      comments: post.comments,
    });
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({
        message: "Post not found",
      });
    }
  }
});

module.exports = router;
