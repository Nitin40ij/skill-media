const User = require("../models/User");
const Report = require("../models/Report");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const hashService = require('../services/hash-service');
const { verifyOtp } = require('../services/otp-service');
const { validationResult, body } = require('express-validator');
const otpService = require("../services/otp-service");
const Skills = require("../models/Skills");
// Creating a jwt and validating it for 7 days.
const createToken = (user) => {
    return jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '7d' })
}
// Register Validtions form email
module.exports.registerValidations = [
    body("email").not().isEmpty().isEmail().withMessage("Please Enter a valid email").trim(),
    body("password").not().isEmpty().isLength({ min: 6 }).withMessage("Password must be 6 characters long").trim(),
    body("confirmPassword").not().isEmpty().isLength({ min: 6 }).withMessage("Confirm Password should be same as password").trim(),
    body("firstName").trim().not().isEmpty().withMessage("firstName required"),
    body("lastName").trim().not().isEmpty().withMessage("lastName required"),
    body("gender").not().isEmpty().withMessage("Gender is required"),
    body("birthdate").not().isEmpty().withMessage("Date of Birth is required"),
    body('username').isLength({ min: 3 }).trim().withMessage("userName must be atleast 3 character long")
]
// Register Validation for phone
module.exports.registerValidations1 = [
    body("phone").not().isEmpty().withMessage("Please Enter a valid Phone Number").trim(),
    body("password").isLength({ mis: 6 }).withMessage("Password must be 6 characters long").trim(),
    body("firstName").trim().not().isEmpty().withMessage("firstName required"),
    body("lastName").trim().not().isEmpty().withMessage("lastName required"),
    body("gender").not().isEmpty().withMessage("Gender is required"),
    body("birthdate").not().isEmpty().withMessage("Date of Birth is required"),
    body('username').isLength({ min: 3 }).trim().withMessage("userName must be atleast 3 character long")
]
// Send OTP function
module.exports.sendOtp = async (req, res) => {
    const { type } = req.body;
    let phone;
    let email;
    if (type === 'email') {
        email = req.body.email;
    } else {
        phone = req.body.phone
    }
    if (type === 'email' ? email.length === 0 : !phone) {
        res.status(200).json({ message: type === 'email' ? `Email field is required!` : "Phone field is required!" });
    }
    const otp = await otpService.generateOtp();
    const ttl = 1000 * 60 * 2;
    const expires = Date.now() + ttl;
    const data = `${type === 'email' ? email : phone}.${otp}.${expires}`;
    const hash = hashService.hashOtp(data);
    try {
        type === 'email' ? await otpService.sendByEmail(email, otp) : await otpService.sendBySms(phone, otp)

        return res.status(200).json({ msg: "Otp Sent Successfully", hash: `${hash}.${expires}`, otp });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'message sending failed' });
    }
}
// Verify OTP for the given Time
module.exports.verifyOtp = async (req, res) => {
    const { type, otp, otpHash } = req.body;
    let email;
    let phone;
    if (type === 'email') {
        email = req.body.email;
    } else {
        phone = req.body.phone;
    }
    if (!otp || !otpHash) {
        return res.status(200).json({ msg: "Otp Required" });
    }
    const [hashedOtp, expires] = otpHash.split('.');
    const data = type === 'email' ? `${email}.${otp}.${expires}` : `${phone}.${otp}.${expires}`;
    const isValid = otpService.verifyOtp(hashedOtp, data);
    if (!isValid) {
        res.status(200).json({ msg: "Invalid OTP", isValid });
    } else {
        return res.status(200).json({ msg: "Fine otp", isValid });
    }
}
// Verify Password OTP for the given Time
module.exports.verifyPasswordOtp = async (req, res) => {
    const { type, otp, otpHash } = req.body;
    let email;
    let phone;
    if (type === 'email') {
        email = req.body.email;
    } else {
        phone = req.body.phone;
    }
    if (!otp || !otpHash) {
        return res.status(200).json({ msg: "Otp Required" });
    }
    const [hashedOtp, expires] = otpHash.split('.');
    const data = type === 'email' ? `${email}.${otp}.${expires}` : `${phone}.${otp}.${expires}`;
    const isValid = otpService.verifyOtp(hashedOtp, data);
    if (!isValid) {
        res.status(200).json({ msg: "Invalid OTP", isValid });
    } else {
        return res.status(200).json({ msg: "Fine otp", isValid });
    }
}

// Register new user with all the validation with Email
module.exports.register = async (req, res) => {
    const { firstName, lastName, password, gender, username, confirmPassword, birthdate, email } = req.body;
    const errors = validationResult(req);
    if (password !== confirmPassword) {
        console.log(password === confirmPassword);
        const arr = [];
        arr.push({ msg: "Password didn't match" });
        return res.status(200).json({ errors: arr });
    }
    if (!errors.isEmpty()) {
        console.log(errors);
        return res.status(200).json({ errors: errors.array() });
    } else {
        try {
            const userExist = await User.findOne({ email });
            if (userExist) {
                return res.status(200).json({
                    errors: [{ msg: "Email already exists" }]
                });
            }
            const userNameExists = await User.findOne({
                username
            })
            if (userNameExists) {
                return res.status(400).json({
                    errors: [{ msg: "userName already taken" }]
                });
            }
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
            try {
                const user = await User.create({
                    firstName
                    , lastName
                    , email
                    , username
                    , password: hash
                    , gender
                    , birthdate
                });

                const token = createToken(user);
                res.status(200).cookie("token", token, {
                    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
                    httpOnly: true
                }).json({ success: true, user, token });
            } catch (error) {
                console.log(error);
                return res.status(500).json({ error })
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ errors: error })
        }
    }
}
// Register With Phone Number
module.exports.registerPhonenumber = async (req, res) => {
    const { firstName, lastName, password, gender, username, birthdate, phone } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(200).json({ errors: errors.array() });
    } else {
        try {
            const userExist = await User.findOne({ phone });
            if (userExist) {
                return res.status(400).json({
                    errors: [{ msg: "Phone Number already exists" }]
                });
            }

            const userNameExists = await User.findOne({
                username
            })

            if (userNameExists) {
                return res.status(400).json({
                    errors: [{ msg: "userName already taken" }]
                });
            }
            console.log("hereeeeeeee");

            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
            try {
                const user = await User.create({
                    firstName
                    , lastName
                    , phone
                    , username
                    , password: hash
                    , gender
                    , birthdate
                });

                const token = createToken(user);
                res.status(200).cookie("token", token, {
                    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
                    httpOnly: true
                }).json({ success: true, user, token });
            } catch (error) {
                return res.status(500).json({ error })
            }
        } catch (error) {
            return res.status(500).json({ errors: error })
        }
    }
}
// Login Validations
module.exports.loginValidations = [
    body("email").not().isEmpty().trim().withMessage("Email Id or Phone required"),
    body("password").not().isEmpty().trim().withMessage("Password must not be Empty")
]
// Login User with phone number and email
module.exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(200).json({ errors: errors.array() });
    } else {
        try {
            let user;
            const { email } = req.body;
            const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
            const isPhone = re.test(email);
            console.log(isPhone);
            if (isPhone) {
                user = await User.findOne({ phone: email });;
            } else {
                user = await User.findOne({ email });;
            }
            const { password } = req.body;
            console.log(user);
            if (user) {
                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) {
                    return res.status(401).json({
                        msg: "wrong username or password"
                    })
                } else {
                    const token = createToken(user);
                    res.status(200).cookie("token", token, {
                        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
                        httpOnly: true
                    }).json({ success: true, user, token });
                }
            } else {
                return res.status(200).json({
                    errors: [{
                        msg: "Wrong username or password"
                    }]
                })
            }
        } catch (error) {
            res.status(500).json({ errors: error.message })
        }
    }
}
// Seting Skills for the user 
module.exports.setSkills = async (req, res) => {
    try {
        const user = await User.findById(req.body.id);
        try {
            user.skills = req.body.skillsArr.concat(req.body.UnPrskillsArr);
            user.unprofessionalSkills = req.body.UnPrskillsArr;
            user.professionalSkills = req.body.skillsArr;
            await user.save();
            const token = createToken(user);
            const { skills } = user;
            return res.json({ msg: "Fine till now", user, token, skills });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message })
        }

    } catch (error) {
        res.json({ error: error.message });
    }
}
// Edit Skills both Profeesional and unprofessional
module.exports.editSkills = async (req, res) => {
    try {
        const { id, skills, type } = req.body;
        console.log(skills, type);
        const user = await User.findById(id);
        try {
            let finalArr = [];

            if (type === 'professional') {
                user.unprofessionalSkills.forEach(skill => {
                    finalArr.push(skill)
                });
                user.professionalSkills = skills;
            } else {
                user.professionalSkills.forEach(skill => {
                    finalArr.push(skill)
                });
                user.unprofessionalSkills = skills;

            }
            skills.forEach(skill => {
                finalArr.push(skill)
            });
            console.log(finalArr);
            user.skills = finalArr;
            await user.save();
            const token = createToken(user);
            return res.json({ msg: "Skills Updated", user, token });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message })
        }

    } catch (error) {
        res.json({ error: error.message });
    }

}
module.exports.reportPost = async (req, res) => {
    const { state, user, id } = req.body;

    try {
        const response = await Report.create({
            report: state.report,
            description: state.description,
            userId: user._id,
            postId: id,
            username: user.username
        });
        console.log(response);
        return res.status(200).json({ msg: "Reported" });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error });
    }
}
module.exports.getAllUsers = async (req, res) => {
    try {
        const response = await User.find();
        return res.status(200).json({ response });
    } catch (error) {

    }
}
module.exports.getAllSkills = async (req, res) => {
    try {
        const response = await User.find();
        return res.status(200).json({ response });
    } catch (error) {

    }
}
module.exports.getSkillUsers = async (req, res) => {
    try {
        const fetchUsers = async (users) => {
            let data = [];
            for (let i = 0; i < users.length; i++) {
                const user = await User.findById(users[i]);
                data.push(user);
            }
            console.log(data.length);
            return res.json({ msg: "Fine Response", data });
        }
        const skill = req.params.skill;
        console.log(skill);
        const response = await Skills.findOne({ name: skill.toLowerCase() })
        if (response) {
            const users = response.users;
            fetchUsers(users);
        }
        else {
            return res.json({ msg: "Fine Response", data: [] });

        }
    } catch (error) {
        console.log(error);
    }
}
module.exports.forgetPassword = async (req, res) => {
    const { type } = req.body;
    if (type === 'email') {
        const { email } = req.body;
        const isUser = await User.findOne({ email: email });
        if (!isUser) {
            res.status(200).json({ msg: "User Not found with this Email valid Email" });
        }
        const otp = await otpService.generateOtp();
        const ttl = 1000 * 60 * 2;
        const expires = Date.now() + ttl;
        const data = `${type === 'email' ? email : phone}.${otp}.${expires}`;
        const hash = hashService.hashOtp(data);
        try {
            await otpService.sendByEmail(email, otp);
            return res.status(200).json({ msg: "Otp Sent Successfully", hash: `${hash}.${expires}`, otp });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'message sending failed' });
        }
    } else {
        const { phone } = req.body;
        const isUser = await User.findOne({ phone: phone });
        if (!isUser) {
            res.status(200).json({ msg: "User Not found with this Phone Number" });
        }
        const otp = await otpService.generateOtp();
        const ttl = 1000 * 60 * 2;
        const expires = Date.now() + ttl;
        const data = `${type === 'email' ? email : phone}.${otp}.${expires}`;
        const hash = hashService.hashOtp(data);
        try {
            await otpService.sendBySms(phone, otp);
            return res.status(200).json({ msg: "Otp Sent Successfully", hash: `${hash}.${expires}`, otp });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'message sending failed' });
        }
    }
    return res.status(200).json({ msg: "fine by Now" });
}
module.exports.createNewPassword = async (req, res) => {
    try {
        let user;
        const { type, email, password } = req.body;
        if (type === 'email') {
            user = await User.findOne({ email });
        } else {
            user = await User.findOne({ phone: req.body.phone });
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        user.password = hash;
        const response = await user.save();
        return res.status(200).json({ msg: "FINE TILL HERE", changed: true })
    } catch (error) {
        // console.log(error);
        return res.status(200).json({ msg: error.message, changed: false })

    }

}
module.exports.getParticularUser = async (req, res) => {
    try {
        const { username } = req.params;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(200).json({ msg: `User Not Found with ${username}` })
        }
        return res.status(200).json({ msg: "Trying", user })
    } catch (error) {
        return res.status(400).json({ msg: error.message });
    }
}