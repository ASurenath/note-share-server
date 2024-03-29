const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    uname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    interests: {
        type: String,
    },
    bio: {
        type: String,
    },
    profilePic: {
        type: String
    }
})

const users = mongoose.model("users", userSchema)
module.exports = users