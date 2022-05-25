const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { v4: uuidvd } = require('uuid');
const fs = require('fs')
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcrypt');
const formidable = require("formidable");
const cloudinary = require("cloudinary");

require('dotenv').config();
// Update the first and Last Name for the user.
module.exports.updateName = async (req, res) => {
  const { firstName, lastName, id } = req.body;
  if (firstName === '') {
    return res.status(400).json({ errors: [{ msg: 'Both first and last name is required' }] });
  }
  else if (lastName === '') {
    return res.status(400).json({ errors: [{ msg: 'Both first and last name is required' }] });
  } else {
    try {
      const user = await User.findOneAndUpdate(
        { _id: id },
        { firstName, lastName },
        { new: true }
      );
      const token = jwt.sign({ user }, process.env.JWT_SECRET, {
        expiresIn: '7d',
      });
      console.log(token);
      return res.status(200).json({ token, msg: 'Your name has been updated' });

    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  }
}
// Update Profile Picture for the User.
module.exports.updatePicture = async (req, res) => {
  const { id } = req.body;
  const errors = [];
  if (!req.file) {
    errors.push({ msg: "Please Upload a valid File" });
    return res.json({ errors });
  } else {
    cloudinary.v2.uploader.upload(req.file.path,
      { width: 400, quality: "auto" },
      async function (err, result) {
        if (result) {
          try {
            console.log(result);
            const user = await User.findById(id);
            user.profilePicture = result.url;
            await user.save();
            const token = jwt.sign({ user }, process.env.JWT_SECRET, {
              expiresIn: '7d',
            });
            return res.status(200).json({ token, msg: 'Your Profile Picture has been updated' });
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
}
// creating new Image Blog using formidable and doing all the validations and uploading on
// cloudinary
