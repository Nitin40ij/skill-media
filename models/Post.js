const { model, Schema } = require('mongoose');

// Complete Post Model
const postSchema = new Schema(
    {
        title: {
            type: String,
            default: null
        },
        body: {
            type: String,
            default: null
        },
        description: {
            type: String,
            default: null
        },
        slug: { type: String },
        userName: {
            type: String,
        },
        product_id: {
            type: String,
            default: null
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        },
        blog: {
            type: String,
            default: null
        },
        category: {
            type: String,
            default: null
        },
        image: {
            type: String,
            default: null
        },
        imageCaption: {
            type: String,
            default: null
        },
        videoCaption: {
            type: String,
            default: null
        },
        video: {
            type: String,
            default: null
        },
        userName: {
            type: String,
            required: true
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }, type: {
            type: String,
            required: true
        },
        profilePicture: {
            type: String,
            default: null
        },
        likes: [
            {
                type: Schema.Types.ObjectId,
                ref: "user"
            }
        ],
        comments: [
            {
                user: {
                    type: Schema.Types.ObjectId,
                    ref: "user"
                },
                name: {
                    type: String,
                    // required:true
                },
                comment: {
                    type: String,
                    required: true
                }
            }
        ]
    }, { timestamps: true }
)
module.exports = model('post', postSchema);