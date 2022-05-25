const {model,Schema} = require('mongoose')
// Skill Model
const reportSchema = new Schema(
    {
        report:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        },
        postId:{
            type:String,
            required:true
        },
        userId:{
            type:String,
            required:true
        },
        username:{
            type:String,
            required:true
        }
    }
)
module.exports=model('reports',reportSchema);