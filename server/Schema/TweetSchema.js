const mongoose = require('mongoose')
const TweetSchema = mongoose.Schema({
    title: {
        type: String,
        default: ""
    },
    image: {
        type: String,
        default: ""
    },
    likes: [String],
    comments: [
        {
            name: String,
            comment: String,
            _id: String,
            picture: String,
            like: [String],
            dislike: [String],
            updatedAt: {
                type: Date,
            },
            reply:
                [
                    {
                        name: String,
                        comment: String,
                        _id: String,
                        picture: String,
                        like: [String],
                        dislike: [String],
                        time: {
                            type: Date,
                        },
                    }
                ]
        }
    ],
    userId: {
        type: String
    },
    userImage: {
        type: String
    },
    userName: {
        type: String,
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("tweetdata", TweetSchema);