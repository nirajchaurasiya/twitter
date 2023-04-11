const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Userschema = mongoose.Schema({
    name: {
        type: String,
        default: ''
    },
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        require: true,
        type: String,
    },
    profilePicture: {
        type: String,
        default: ''
    },
    coverProfile: {
        type: String,
        default: ''
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        default: ''
    },
    city: {
        type: String,
        default: ''
    },
    from: {
        type: String,
        default: ''
    },
    followers: [String],
    followings: [String],
    relationship: Number,
    contact: {
        type: String,
        default: ''
    },
    website: {
        type: String,
        default: ''
    }
})

Userschema.pre('save', async function (next) {
    // Only hash the password if it has been modified by the user
    if (!this.isModified('password')) {
        return next();
    }

    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
});

module.exports = mongoose.model('userdata', Userschema);
