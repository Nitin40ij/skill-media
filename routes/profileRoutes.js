const express = require('express');
const auth = require("../utils/auth");
const router = express.Router();
const multer = require("multer");

const {
    updateName,updatePicture
}=require("../controllers/profileController");
const storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});
const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
let upload = multer({ storage, fileFilter });

// UpdateNAme Route
router.post('/updateName',auth,updateName);
// Update Picture Route
router.post('/updatePicture',auth,upload.single('image'),updatePicture);



module.exports=router;