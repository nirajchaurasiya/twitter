const Router = require('express').Router();
const TweetSchema = require('../Schema/TweetSchema');
Router.get('/getpost/:id', async (req, res) => {
    try {
        const { id } = req.params
        const isPostIdExist = await TweetSchema.findById(id)
        if (isPostIdExist) return res.send({ "status": "1", "msg": isPostIdExist })
    } catch (error) {
        res.send({ "status": "0", "msg": "UserId doesn't exist" });
    }
})









module.exports = Router