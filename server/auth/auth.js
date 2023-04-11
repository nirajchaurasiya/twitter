const Router = require('express').Router();
const UserSchema = require('../Schema/UserSchema')
const bcrypt = require('bcrypt')
const upload = require('../multer/UserpicUpload')


Router.post('/register', upload.single('profilePicture'), async (req, res) => {
    try {
        const { email, username, password } = req.body
        if (!email || !username || !password) {
            if (await UserSchema.findOne({ email: email })) {
                res.send({ "status": "0", "msg": "Email already exists" })
            }
            else if (await UserSchema.findOne({ username: username })) {
                res.send({ "status": "2", "msg": "Username already exists" })
            }
            else {
                const datas = req.body
                await UserSchema.create({ ...datas, profilePicture: req.file.path });
                res.send({ "status": "1", "msg": "Successfully created account. You can login now." })
            }
        }

    } catch (error) {
        console.log(`An unexpected error occured!`)
    }
})

Router.post('/login', async (req, res) => {
    try {
        const { email } = req.body;
        console.log(email)
        const isEmailExist = await UserSchema.findOne({ email: email });
        if (!isEmailExist) {
            res.send({ "status": "0", "msg": "Invalid Credentials" })
        }
        else {
            const originalPassword = await isEmailExist.password;
            const isPasswordMatch = await bcrypt.compare(req.body.password, originalPassword);
            if (isPasswordMatch) {
                res.send({ "status": "1", "data": isEmailExist });
            }
            else {
                res.send({ "status": "0", "msg": "Invalid Credentialsp" })
            }
        }
    } catch (error) {
        console.log(`An unexpected error occured`)
    }
})









module.exports = Router 