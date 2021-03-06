const {model,Schema}=require('mongoose');
// User Model
const userSchema = new Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        default:null
    },
    phone:{
        type:String,
        default:null
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    birthdate:{
        type:Date,
        required:true
    },
    profilePicture:{
        type:String,
        default:null
    },
    unprofessionalSkills:{
        type:[String]
    },
    professionalSkills:{
        type:[String]
    },
    skills:{
        type:[String]
    },
    likedPost:{
        type:[String]
    }
},{timestamps:true});

module.exports=model("user",userSchema);