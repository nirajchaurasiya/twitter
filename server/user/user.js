const Router = require('express').Router();
const UserSchema = require('../Schema/UserSchema')
const upload = require('../multer/UserpicUpload')
Router.post('/updateprofile/:userId', upload.single('profilePicture'), async (req, res) => {
    try {
        const userId = req.params.userId
        const findById = await UserSchema.findById(userId);
        if (findById) {
            const path = req.file.path
            await UserSchema.findByIdAndUpdate({ _id: userId }, { profilePicture: path })
            const newData = await UserSchema.findById(userId);
            res.send({ "status": 1, data: newData })
        }
        else {
            res.send({ status: 0, msg: "UserId is wrong" });
        }
    } catch (error) {

    }
})



Router.post('/updatecover/:userId', upload.single('coverProfile'), async (req, res) => {
    try {
        const userId = req.params.userId
        const findById = await UserSchema.findById(userId);
        if (findById) {
            const path = req.file.path
            await UserSchema.findByIdAndUpdate({ _id: userId }, { coverProfile: path })
            // res.send("Success")
            const newData = await UserSchema.findById(userId);
            res.send({ "status": 1, data: newData })
        }
        else {
            res.send({ status: 0, msg: "UserId is wrong" });
        }
    } catch (error) {

    }
})

Router.get('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const isUserIdExist = await UserSchema.findById(userId);
        if (isUserIdExist) return res.send({ "status": "1", "msg": isUserIdExist })
    } catch (error) {
        res.send({ "status": "0", "msg": "UserId doesn't exist" });
    }
})


Router.get('/getalluser/getalluser', async (req, res) => {
    try {
        const userData = await UserSchema.find();
        res.send({ "status": "1", "msg": userData })
    } catch (error) {
        res.send({ "status": "0", "msg": "Something went wrong" });
    }
})

module.exports = Router 