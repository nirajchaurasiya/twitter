const Router = require('express').Router();
const upload = require('../multer/Tweetpicture')
const UserSchema = require('../Schema/UserSchema')
const TweetSchema = require('../Schema/TweetSchema')
Router.post("/", upload.single('image'), async (req, res) => {
    try {
        const { userId } = req.body;
        const path = req.file.path;
        const body = req.body
        const iSIdExist = await UserSchema.findById(userId);
        if (iSIdExist) {
            await TweetSchema.create({
                ...body, image: path
            })
            res.send({ "status": "1", "msg": "Tweet success" });
        }
        else {
            res.send({ "status": "0", "msg": "userId doesn't exist" });
        }
    } catch (error) {
        res.send({ "status": "2", "msg": "Something went wrong" });

    }
})
Router.get('/alltweet', async (req, res) => {
    try {
        const allTweets = await TweetSchema.find();
        res.send({ "status": "1", "tweets": allTweets });
    } catch (error) {
        res.send({ "status": "0", "msg": "Something went wrong" });
    }
})


Router.get('/alltweet/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const allTweetsOfId = await TweetSchema.find({ userId: id })
        res.send({ "status": "1", "tweets": allTweetsOfId });
    } catch (error) {
        res.send({ "status": "0", "msg": "Something went wrong" });
    }
})

Router.post('/tweetcomment/:postId', async (req, res) => {
    try {
        const body = req.body;
        const { postId } = req.params;
        await TweetSchema.findByIdAndUpdate(postId, { $addToSet: { comments: req.body } })
        res.send({ "status": "1", "msg": "Success" });
    } catch (error) {

    }
})


Router.post('/tweets/:id/comment/:commentId/reply/:index', async (req, res) => {
    try {
        const tweetId = req.params.id;
        const commentId = req.params.commentId;
        const index = req.params.index;
        const reply = req.body; // Assuming that the request body contains the reply object

        // Find the tweet with the given ID
        const tweet = await TweetSchema.findById(tweetId);
        if (tweet) {
            const comments = tweet.comments;
            if (comments && comments.length > index) {
                const comment = comments.filter((comment) => comment._id == commentId)[index];
                if (comment) {
                    const replyArr = comment.reply || [];
                    replyArr.push(reply);
                    comment.reply = replyArr;
                    const updatedTweet = await tweet.save();
                    res.send({ "status": "1", "msg": updatedTweet });
                } else {
                    res.status(404).send('Comment not found');
                }
            } else {
                res.status(404).send('Comment index out of range');
            }
        } else {
            res.status(404).send('Tweet not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});







module.exports = Router 