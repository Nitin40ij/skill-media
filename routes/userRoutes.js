const app = require('express');
const router = app.Router();
const {register,registerValidations, registerValidations1,login, loginValidations,setSkills,verifyOtp, forgetPassword,sendOtp,registerPhonenumber,editSkills,reportPost,getAllUsers,verifyPasswordOtp,getSkillUsers,createNewPassword,getParticularUser}=require("../controllers/userController");
// Register Route
router.post("/register",registerValidations,register);
// Phone register route
router.post("/registerPhone",registerValidations1,registerPhonenumber);
// login route
router.post("/login",loginValidations,login);
// setSkill Route
router.post("/setSkills",setSkills);
// Edit Skill Route
router.post("/editSkills",editSkills);
// Send Otp Route
router.post("/sendOtp",sendOtp);
// Verify Otp Route
router.post("/verifyOtp",verifyOtp);
// Report Post Route
router.post("/reportPost",reportPost);
// getAll users 
router.get("/getAllUsers",getAllUsers);
// getSkillUsers
router.get("/skillUsers/:skill",getSkillUsers);
// send forget Password Otp
router.post("/sendForgetPassword",forgetPassword);
// Verify Forget Password Otp Route
router.post("/verifyPasswordOtp",verifyPasswordOtp);
// Create New Password
router.post("/createNewPassword",createNewPassword);
// get particular User
router.post("/specificUser/:username",getParticularUser);

module.exports=router;