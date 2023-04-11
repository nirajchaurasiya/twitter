const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')
require('dotenv').config();
const PORT = process.env.PORT
require('./connection/conn')
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.use(express.static('uploads'))
app.use("/uploads", express.static(path.join(__dirname, "uploads")))
app.use('/api/auth', require('./auth/auth'));
app.use('/api/user', require('./user/user'));
app.use('/api/tweet', require('./tweets/Tweets'));
app.get('/', (req, res) => {
    res.send({ "msg": "success" })
})
app.listen(PORT, () => {
    console.log(`Backend is running on ${PORT}`)
})