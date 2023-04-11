const Router = require('express').Router();
const upload = require('../multer/Tweetpicture')
const UserSchema = require('../Schema/UserSchema')
const TweetSchema = require('../Schema/TweetSchema')
Router.post("/", upload.single('image'), async (req, res) => {
    try {
        const { userId } = req.body;
        const path = req.file.path;
        const data = req.body
        const iSIdExist = await UserSchema.findById(userId);
        if (iSIdExist) {
            await TweetSchema.create({ ...data, image: path })
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











module.exports = Router 