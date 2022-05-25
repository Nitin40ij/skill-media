const formidable = require("formidable");
const { body, validationResult } = require("express-validator");
const { v4: uuidvd } = require("uuid");
const fs = require("fs");
const Skills = require("../models/Skills");
const Post = require("../models/Post");
const { htmlToText } = require("html-to-text");
const { response } = require("express");
const cloudinary = require("cloudinary");
const multer = require("multer");
const User = require("../models/User");

// Setting cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
// creating new Blog using formidable and doing all the validations
module.exports.createPost = async (req, res) => {
  const form = formidable({ multiples: true });
  form.parse(req, async (error, fields, files) => {
    const { title, body, slug, id, name, category, profilePicture } = fields;
    console.log(fields);
    const errors = [];
    if (title === "") {
      errors.push({ msg: "Title is required" });
    }
    if (category == "") {
      errors.push({ msg: "Category is required" });
    }
    if (body === "<p><br></p>" || body === "") {
      errors.push({ msg: "Body is required" });
    }
    if (slug === "") {
      errors.push({ msg: "Slug is required" });
    }
    const checkSlug = await Post.findOne({ slug });
    if (checkSlug) {
      errors.push({ msg: "Please choose a unique URL" });
    } else {
      if (!error) {
        if (errors.length !== 0) {
          return res.json({ errors: errors });
        }
        try {
          const response = await Post.create({
            title,
            blog: body,
            slug,
            userName: name,
            category,
            userId: id,
            profilePicture: profilePicture,
            type: "blog",
          });
          const getUserWithPosts = async (id) => {
            const help = await Post.findById(id).populate("userId", { _id: 0 }, { gender: { $ne: "female" } })
              .exec((err, userD) => {
                if (err) {
                  console.log(err);
                }
              })
          }
          getUserWithPosts(response._id);
          console.log(response.id);
          const answer = await Skills.findOne({ name: category.toLowerCase() });
          if (answer === null) {
            const response1 = await Skills.create({
              name:   category.toLowerCase(),
              posts: [response._id],
              users: [response.id]
            });
          } else {
            // if (!answer.users.includes(id)) {
              // answer.users.push(id);
            // }
              answer.posts.push(response._id);
            await answer.save();
          }
          console.log("SENT");
          res.status(200).json({ msg: "Your Blog has been created" });
        } catch (error) {
          console.log(error);
          return res.status(500).json({ errors: error, msg: error.message });
        }
      } else {
        console.log(errors);
      }
    }
  });
};
// creating new Image Blog using formidable and doing all the validations and uploading on 
// cloudinary

module.exports.createPostImage = async (req, res) => {
  console.log("here");
  const { caption, slug, id, name, category, profilePicture } = req.body;
  const errors = [];
  if (!req.file) {
    errors.push({ msg: "Please Upload a valid File" });
    return res.json({ errors });
  }
  if (category == "") {
    errors.push({ msg: "Category is required" });
  }
  if (slug === "") {
    errors.push({ msg: "Slug is required" });
  }
  if (Object.keys(req.file).length === 0) {
    errors.push({ msg: "Video is required" });
  }
  const checkSlug = await Post.findOne({ slug });
  if (checkSlug) {
    errors.push({ msg: "Please choose a unique URL" });
  }
  if (errors.length !== 0) {
    return res.json({ errors, files });
  } else {
    cloudinary.v2.uploader.upload(req.file.path,
      { width: 400, quality: "auto" },
      async function (err, result) {
        if (result) {
          try {
            const response = await Post.create({
              image: result.url,
              product_id: result.public_id,
              slug,
              userName: name,
              userId: id,
              imageCaption: caption,
              category,
              type: "photo",
              profilePicture
            });
            const answer = await Skills.findOne({
              name: category.toLowerCase(),
            });
            if (answer === null) {
              const response1 = await Skills.create({
                name: category.toLowerCase(),
                posts: [response._id],
                users:[response.id]
              });
            } else {
              answer.posts.push(response._id);
              // answer.users.push(response._id);
              await answer.save();
            }
  
            res.status(200).json({ msg: "Your post has been created", newPost: response });
          } catch (error) {
            console.log(error);
            return res
              .status(500)
              .json({ errors: error, msg: error.message });
          }
        } else {
          console.log(err, "ERROR");
        }
      });
  }
};
// creating new Video Blog using formidable and doing all the validations
// and uploading on Cloudinary.
module.exports.createPostVideo = async (req, res) => {
  // Get the file name and extension with multer
  const storage = multer.diskStorage({
    filename: (req, file, cb) => {
      const fileExt = file.originalname.split(".").pop();
      const filename = `${new Date().getTime()}.${fileExt}`;
      cb(null, filename);
    },
  });

  // Filter the file to validate if it meets the required video extension
  const fileFilter = (req, file, cb) => {
    if (file.mimetype === "video/mp4") {
      cb(null, true);
    } else {
      cb(
        {
          message: "Unsupported File Format",
        },
        false
      );
    }
  };
  console.log("Uploading video................");
  // Set the storage, file filter and file size with multer
  const upload = multer({
    storage,
    limits: {
      fieldNameSize: 200,
      fileSize: 30 * 1024 * 1024,
    },
    fileFilter,
  }).any();
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
      return res.send(err);
    }
    // SEND FILE TO CLOUDINARY
    const { path } = req.files[0]; // file becomes available in req at this point

    const fName = req.files[0].originalname.split(".")[0];
    cloudinary.v2.uploader.upload(
      path,
      {
        resource_type: "video",
        public_id: `VideoUploads/${fName}`,
        chunk_size: 6000000,
        eager: [
          {
            width: 300,
            height: 300,
            crop: "pad",
            audio_codec: "none",
          },
          {
            width: 160,
            height: 100,
            crop: "crop",
            gravity: "south",
            audio_codec: "none",
          },
        ],
      },

      // Send cloudinary response or catch error
      async (err, result) => {
        if (err) return res.send(err);
        fs.unlinkSync(path);
        const { caption, slug, id, name, category } = req.body;
        try {
          const response = await Post.create({
            video: result.url,
            product_id: result.public_id,
            slug,
            userName: name,
            userId: id,
            imageCaption: caption,
            category,
            type: "video",
          });
          const answer = await Skills.findOne({
            name: category.toLowerCase(),
          });
          if (answer === null) {
            const response1 = await Skills.create({
              name: category.toLowerCase(),
              posts: [response._id],
            });
          } else {
            answer.posts.push(response._id);
            await answer.save();
          }
          console.log("Video Uploaded successfully");
          res.status(200).json({ msg: "Your post has been created" });
        } catch (error) {
          console.log(error);
          return res
            .status(500)
            .json({ errors: error, msg: error.message });
        }
      }
    );
  });
};
// Fetching All the posts created by particular user. 
module.exports.fetchPosts = async (req, res) => {
  const id = req.params.id;
  try {
    const response = await Post.find({ userId: id });
    console.log(response.length, "Nikunj gupta");
    return res.status(200).json({ data: response.reverse() });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: error, msg: error.message });
  }
};
// Fetching posts skill wise and checking all the errors
module.exports.fetchSkillPosts = async (req, res) => {
  const skill = req.params.skill;
  try {
    const response = await Skills.findOne({ name: skill.toLowerCase() });
    // console.log(response);
    if (response === null) {
      return res
        .status(200)
        .json({ msg: "Not Data Found for the Post", posts: [], users: [] });
    }
    let userInfo = [];
    const fetchUserInfo = async (users) => {
      for (let i = 0; i < users.length; i++) {
        const res = await User.findById(users[i]);
        userInfo.push(res);
      }
      return res.status(200).json({ msg: "Data Recieved", posts: data.reverse(), users: userInfo });
    }
    const { posts, users } = response;
    console.log(users);
    let c = 0;
    if (posts.length === 0) {
      res.status(200).json({ msg: "Not Data Found for the Post", posts, users: [] });
    }
    const data = [];
    for (let i = 0; i < posts.length; i++) {
      data[i] = await Post.findById({ _id: posts[i] });
    }
    fetchUserInfo(users);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ errors: error, msg: error.message });
  }
};
// Fetch a particular Post using its Id.
module.exports.fetchPost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await Post.findOne({ _id: id });
    res.status(200).json({ post });
  } catch (error) { }
};
// Post Update Validations
module.exports.updateValidations = [
  body("title").notEmpty().trim().withMessage("Title is required"),
  body("body")
    .notEmpty()
    .trim()
    .custom((value) => {
      let bodyValue = value.replace(/\n/g, "");
      if (htmlToText(bodyValue).trim().length === 0) {
        return false;
      } else {
        return true;
      }
    })
    .withMessage("Body is required"),
  body("category").notEmpty().withMessage("Category is Required"),
];
// Editing The Blog
module.exports.editPosts = async (req, res) => {
  const { title, body, category, id } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    try {
      console.log(id);
      const response = await Post.findByIdAndUpdate(id, {
        title,
        blog: body,
        category,
      });
      console.log(response);
      return res.status(200).json({ msg: "Your post has been updated" });
    } catch (error) {
      return res.status(500).json({ errors: error, msg: error.message });
    }
  }
};
// Editing The Image Blog and changing its image from cloudinary 
module.exports.updateImage = (req, res) => {
  const form = formidable({ multiples: true });
  form.parse(req, async (errors, field, files) => {
    const imageErrors = [];
    if (Object.keys(files).length === 0) {
      // imageErrors.push({msg:"Please choose Image"})
    } else {

    }
    if (imageErrors.length !== 0) {
      // return res.status(400).json({ errors: imageErrors });
    } else {
      try {
        const { id } = field;
        const response = await Post.findByIdAndUpdate(id, {
          imageCaption: field.title,
          category: field.category
        });
        console.log(response, "Image update backend");
        return res.status(200).json({ msg: "Your image has been updated" });
      } catch (error) {
        return res.status(500).json({ errors: error, msg: error.message });
      }
    }
  });
};
// Editing The video Blog  
module.exports.updateVideo = (req, res) => {
  const form = formidable({ multiples: true });
  form.parse(req, async (errors, field, files) => {
    const imageErrors = [];
    if (Object.keys(files).length === 0) {
    } else {

    }
    if (imageErrors.length !== 0) {
      // return res.status(400).json({ errors: imageErrors });
    } else {
      try {
        const { id } = field;
        const response = await Post.findByIdAndUpdate(id, {
          videoCaption: field.title,
          category: field.category
        });
        console.log(response, "Video update backend");
        return res.status(200).json({ msg: "Your video has been updated" });
      } catch (error) {
        return res.status(500).json({ errors: error, msg: error.message });
      }
    }
  });
};
// Deleting a Particular Post using a ID and deleting image from Cloudinary as well.

module.exports.deletePost = async (req, res) => {
  const id1 = req.params.id;
  console.log(id1);
  console.log(id1);
  async function deleteFinal(id) {
    try {
      const response = await Post.findByIdAndRemove(id);
      const answer = await Skills.findOne({
        name: response.category.toLowerCase(),
      });
      const { posts } = answer;
      const index = posts.indexOf(id);
      if (index > -1) {
        console.log(index);
        posts.splice(index, 1);
      }
      await answer.save();
      console.log(response, answer);
      return res.status(200).json({ msg: "Your post has been deleted" });
    } catch (error) {
      console.log(error);
    }
  }
  async function cloud(id, _id) {
    try {
      const trying = await cloudinary.uploader.destroy(id);
      deleteFinal(_id);
    } catch (error) {
      console.log(error);
    }
  }
  async function findPost(id1) {
    const post = await Post.findById(id1);
    cloud(post.product_id, id1);
  }
  try {
    findPost(id1);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ errors: error, msg: error.message });
  }
};
// Deleting Blog a Particular Post using a ID and deleting image from Cloudinary as well.

module.exports.deleteBlog = async (req, res) => {
  const id = req.params.id;
  try {
    const response = await Post.findByIdAndDelete(id);
    console.log(response);
    return res.status(200).json({ msg: "Post Deleted" });
  } catch (error) {

  }
};
// Appriciate a Particular Post
exports.likePost = async (req, res) => {
  console.log("Inside Like");
  Post.findByIdAndUpdate(
    req.params.id,
    {
      $push: { likes: req.body._id },
    },
    { new: true }
  ).exec((err, result) => {
    if (err) {
      console.log(err);
      return res.status(200).json({ error: err });
    } else {
      // console.log(result);
      res.json(result);
    }
  });
};
// Unappriciate a Particular Post
exports.unlikePost = async (req, res) => {
  // console.log("Inside UnLike");

  Post.findByIdAndUpdate(
    req.params.id,
    {
      $pull: { likes: req.body._id },
    },
    { new: true }
  ).exec((err, result) => {
    if (err) {
      console.log(err);
      return res.status(200).json({ error: err });
    } else {

      res.json(result);
    }
  });
};
// Shuffle Array of Posts for randomly getting the Data. (Home Post Data).
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}
// Data for HomePost (All the posts,images and videos). 
// using differnt functions to complete the array traversing 
// as async await was not working
exports.homePostData = async (req, res) => {
  const skills = req.body.skills;
  var arr = [];
  let c = 0;
  let x = 0;
  let r = 0;
  let data = [];
  const delayedLog = (item) => {
    arr[c++] = item;
  };
  async function processArray(array) {
    if (r === skills.length) {
      completeTask();
    }
    for (const item of array) {
      await delayedLog(item);
    }
  }
  async function setSkillData(array) {
    x = 0;
    for (const item of array) {
      if (item !== "") {
        data[x++] = await Post.findById(item);
      }
    }
    returnData();
  }
  skills.forEach(async (skill) => {
    const response = await Skills.findOne({ name: skill.toLowerCase() });
    if (response) {
      console.log(response);
      r++;
      const { posts } = response;
      processArray(posts);
    }
    if (!response) {
      r++;
      if (r === skills.length) {
        completeTask();
      }
    }
  });
  const returnData = () => {
    console.log(data.length);
    return res.status(200).json({ data: data });
  };
  const completeTask = () => {
    shuffleArray(arr);
    setSkillData(arr);
  };
};
// Post Comment on a particular post 
exports.postComment = async (req, res) => {
  const errors = [];
  const { comment, user, post } = req.body;
  if (comment === "") {
    errors.push({ msg: "Comment is required" });
    return res.status(200).json({ errors });
  }
  if (errors.length === 0) {
    try {
      const postData = await Post.findOne({ _id: post._id });
      const commentData = { user: user._id, name: user.username, comment };
      postData.comments.unshift(commentData);
      await postData.save();
      return res.status(200).json({ msg: "Fine", comment: commentData });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
};
// Fetching comments on each Post
exports.getPostComments = async (req, res) => {
  const id = req.params.id;

  try {
    const post = await Post.findById(id);
    return res.status(200).json({ comment: post.comments })

  } catch (error) {
    console.log(error);
  }
};
// const mapStateToProps=(props)=>{
//   return{
//     tasks:props.TaskReducer
//   }
// }