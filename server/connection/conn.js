const mongoose = require('mongoose')
const URI = process.env.URI
try {
    mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true, keepAlive: true }, mongoose.set('strictQuery', false))
        .then((data) => {
            console.log(`Connected Successfully`)
        })
        .catch((err) => {
            console.log(`Some error occured`)
        })
} catch (error) {
    console.log(error)
}