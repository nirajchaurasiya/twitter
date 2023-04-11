const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const path = require('path')
const morgan = require('morgan')
const helmet = require('helmet')
app.use(morgan("common"));
const cors = require('cors')
require('dotenv').config();
const PORT = process.env.PORT
require('./connection/conn')
app.use(bodyParser.json());
app.use(express.json());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
const corsOptions = {
    origin: 'http://localhost:3000'
    // origin: 'https://twitter-6tvv.onrender.com'
};
app.use(cors(corsOptions));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

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