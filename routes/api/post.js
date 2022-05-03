const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
const auth = require("../../middleware/auth");
// @route POST api/post
// @access Private
// @desc Create a post
router.post("/", auth, async (req, res) => {
  try {
    const { title, description, needed, technologyToUse } = req.body;
    const postDetails = {};
    postDetails.user = req.user.id;
    if (title) postDetails.title = title;
    if (description) postDetails.description = description;
    if (needed) postDetails.needed = needed;
    if (technologyToUse) postDetails.technologyToUse = technologyToUse;
    const post = new Post(postDetails);
    await post.save();
    return res.status(200).json(post);
  } catch (err) {
    return res.status(500).json({ msg: "Server Error" });
  }
});

// @route Get api/post
// @access Private
// @desc Get user post

router.get("/getUserPost", auth, async (req, res) => {
  try {
    // console.log(req.user.id);
    const userPost = await Post.find({ user: req.user.id }).sort({ date: -1 });
    // console.log(userPost);
    return res.status(200).json(userPost);
  } catch (err) {
    return res.status(500).json({ msg: "Server Error" });
  }
});

// @route Get api/post
// @access Public
// @desc Get All post

router.get("/getAllPost", auth, async (req, res) => {
  try {
    // console.log(req.user.id);
    const allPost = await Post.find({ user: { $ne: req.user.id } }).sort({
      date: -1,
    });
    // console.log(userPost);
    return res.status(200).json(allPost);
  } catch (err) {
    return res.status(500).json({ msg: "Server Error" });
  }
});

// @route GET api/post
// @access Private
// @desc Get a post

router.get("/:post_id", auth, async (req, res) => {
  try {
    console.log(req.params.post_id);
    const post = await Post.findOne({
      _id: req.params.post_id,
    }).populate("user", "-password");
    const profile = await Profile.findOne({ user: req.user.id });
    if (!post) {
      return res.status(251).json({ error: "No Post found" });
    }
    const response = {};
    response.user = post.user;
    response.mobileNo = profile.mobileNo;
    response.title = post.title;
    response.description = post.description;
    response.date = post.date;
    response._id = post._id;
    response.needed = post.needed;
    response.technologyToUse = post.technologyToUse;
    console.log(post);
    console.log(response);
    return res.status(200).json(response);
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(251).json({ error: "No Post found" });
    }
    return res.status(500).json({ error: "Server Error" });
  }
});

// @route DELETE api/post
// @access Private
// @desc Delete a post
router.delete("/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) {
      return res.status(400).json({ msg: "Post not found" });
    }
    if (post.user.toString() != req.user.id) {
      return res.status(400).json({ msg: "Unauthorised user: failed delete" });
    }
    await post.remove();
    return res.status(200).json({ msg: "Post removed" });
  } catch (err) {
    return res.status(500).json({ msg: "Server Error" });
  }
});

// @route PUT api/post
// @access Private
// @desc Like a post
router.put("/like/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    const likes = post.likes.filter(
      (like) => like.user.toString() === req.user.id
    );
    if (likes.length > 0) {
      return res.status(200).json({ msg: "user already liked" });
    }
    post.likes.unshift({ user: req.user.id });
    await post.save();
    return res.status(200).json(post);
  } catch (err) {
    return res.status(500).json({ msg: "Server Error" });
  }
});

// @route PUT api/post
// @access Private
// @desc Unlike a post
router.put("/unlike/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    const likes = post.likes.filter(
      (like) => like.user.toString() === req.user.id
    );
    if (likes.length === 0) {
      return res.status(200).json({ msg: "user has not liked" });
    }
    const likeIndex = post.likes
      .map((item) => item.user.toString())
      .indexOf(req.user.id);
    post.likes.splice(likeIndex, 1);
    // console.log(post.likes);
    await post.save();
    return res.status(200).json(post);
  } catch (err) {
    return res.status(500).json({ msg: "Server Error" });
  }
});

// @route POST api/post
// @access Private
// @desc Create a comment
router.post("/comment/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) {
      return res.status(400).json({ msg: "Post not found" });
    }
    const { comment } = req.body;
    const commentDetails = {};
    commentDetails.user = req.user.id;
    commentDetails.comment = comment;

    post.comments.unshift(commentDetails);

    await post.save();
    return res.status(200).json(post);
  } catch (err) {
    return res.status(500).json({ msg: "Server Error" });
  }
});

// @route DELETE api/post
// @access Private
// @desc Delete a comment
router.delete(
  "/comment/:post_id/delete/:comment_id",
  auth,
  async (req, res) => {
    try {
      console.log(req.params.post_id);
      console.log(req.params.comment_id);
      const post = await Post.findById(req.params.post_id);
      if (!post) {
        return res.status(400).json({ msg: "Post not found" });
      }

      const comment = post.comments.find(
        (comment) => comment.id === req.params.comment_id
      );
      console.log(comment);
      if (!comment) {
        return res.status(400).json({ msg: "No comment found" });
      }
      if (comment.user.toString() !== req.user.id) {
        return res
          .status(400)
          .json({ msg: "Unauthorised user: delete comment" });
      }
      const commentIndex = post.comments
        .map((item) => item.id.toString())
        .indexOf(req.params.comment_id);

      post.comments.splice(commentIndex, 1);
      await post.save();
      return res.status(200).json(post);
    } catch (err) {
      return res.status(500).json({ msg: "Server Error" });
    }
  }
);

module.exports = router;
