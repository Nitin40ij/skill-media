const express = require('express')
const router = express.Router();
const multer = require("multer");
const path = require('path')
const { v4: uuidv4 } = require('uuid');
const { createPost, createPostImage, createPostVideo, fetchPosts, editPosts, postComment, updateValidations, fetchPost, updateImage, deletePost, fetchSkillPosts, homePostData, getPostComments, likePost, unlikePost, updateVideo, deleteBlog } = require("../controllers/postController");
const auth = require("../utils/auth");
const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
}
const videoStorage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});
const videoFileFilter = (req, file, cb) => {
  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

let upload = multer({ storage, fileFilter });
let videoUpload = multer({ videoStorage, videoFileFilter });
// create Blog Post Route
router.post("/create_post", auth, createPost);
// create Image Post Route
router.post("/create_post_image", auth, upload.single('image'), createPostImage);
// create Video Post Route
router.post("/create_post_video", auth, createPostVideo);
// Fetch Post with user ID
router.get("/posts/:id", auth, fetchPosts);
// Fetch Post with post ID(Indicidual Post)
router.get("/post/:id", auth, fetchPost);
// Fetch Post Skill-wise using skill as query
router.get("/skillFetch/:skill", auth, fetchSkillPosts);
// Update Post Blog
router.post("/updatePost", [auth, updateValidations], editPosts);
// Update Image Post route
router.post("/updateImage", updateImage);
// Update Image Post route
router.post("/updateVideo", updateVideo);
// Delete Post by id
router.delete('/delete/:id', auth, deletePost);
// Delete Blog by id
router.delete('/deletePost/:id', auth, deleteBlog);
// Appriciate Post using ID
router.post("/postAppriciate/:id", auth, likePost);
// UnAppriciate Post using ID
router.post("/postunAppriciate/:id", auth, unlikePost);
// Get Post Comment using post ID
router.get("/getComments/:id", auth, getPostComments);
// Get Home Post Data
router.post("/homePostData", auth, homePostData);
// Post Comment on Any Post
router.post("/postComment", auth, postComment);
module.exports = router;