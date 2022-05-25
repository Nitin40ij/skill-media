const {model,Schema} = require('mongoose')
// Skill Model
const skillsSchema = new Schema([
    {name:{type:String},posts:{type:[String]},users:{type:[String]}},
],{timestamps:true}
)
module.exports=model('skills',skillsSchema);