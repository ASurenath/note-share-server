const users = require('../Models/userModel')
const notes = require('../Models/noteModel')
const jwt = require('jsonwebtoken')
const ObjectId = require('mongodb').ObjectId;

///Register controller
exports.register = async (req, res) => {
    console.log("inside register api");
    const { uname, email, password } = req.body
    console.log(uname, email, password);
    try {
        const existingUser = await users.findOne({ email })
        console.log("Existing user:", existingUser)
        if (existingUser) {
            res.status(406).json("Email already registered with us. Please Login.")
        }
        else {
            const newUser = new users({
                uname, email, password, interests: "", bio: "", profilePic: ""
            })
            await newUser.save()
            console.log(newUser);
            const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET_KEY)
            res.status(200).json({ user: { ...newUser["_doc"], "password": "" }, token })
        }
    }
    catch (err) {
        res.status(401).json(err)
    }
}

/////login

exports.login = async (req, res) => {
    console.log("inside login API");
    const { email, password } = req.body
    console.log(email, password);
    try {
        const existingUser = await users.findOne({ email, password })
        console.log(existingUser)
        if (existingUser) {
            const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET_KEY)
            res.status(200).json({ "user": { ...existingUser["_doc"], "password": "" }, token })
        }
        else {
            res.status(404).json("Invalid email / password!")
        }
    }
    catch (err) {
        res.status(401).json(err)
    }
}

//// get user data
exports.getUserData = async (req, res) => {
    console.log("inside get user data api");
    const _id = new ObjectId(req.payload)
    try {
        const user = await users.findOne({ _id }, { password: 0 })
        res.status(200).json(user)
    }
    catch (err) {
        console.log(err);
        res.status(401).json(err)
    }
}
//// update user data
exports.editUserData = async (req, res) => {
    console.log("inside edit user data api");
    const _id = new ObjectId(req.payload)
    const { uname, email, interests, bio } = req.body
    try {
        const user = await users.findOneAndUpdate({ _id }, { uname, email, interests, bio })
        res.status(200).json("User data updated successfully")
    }
    catch (err) {
        console.log(err);
        res.status(401).json(err)
    }
}
//// changePassword
exports.changePassword = async (req, res) => {
    console.log("inside edit user data api");
    const _id = new ObjectId(req.payload)
    const { currentPassword, newPassword } = req.body
    try {
        const user = await users.findOneAndUpdate({ _id, password: currentPassword }, { password: newPassword })
        if (user) {
            res.status(200).json("Password changed")
        } else {
            res.status(404).json("Incorrect Password")
        }
    }
    catch (err) {
        console.log(err);
        res.status(401).json(err)
    }
}

//// delete Account
exports.deleteUser = async (req, res) => {
    console.log("inside delete user data api");
    const _id = new ObjectId(req.payload)
    const { password } = req.body
    try {
        const user = await users.findOneAndDelete({ _id, password })
        await notes.deleteMany({ author: _id })
        if (user) {
            res.status(200).json("Account deleted successfully")
        } else {
            res.status(404).json("Incorrect Password")
        }
    }
    catch (err) {
        console.log(err);
        res.status(401).json(err)
    }
}

//// update Account
exports.editUser = async (req, res) => {
    console.log("inside edit user data api");
    const _id = new ObjectId(req.payload)
    const { uname, interests, bio, profilePic } = req.body
    const newProfilePic = req.file ? req.file.filename : profilePic
    try {
        const user = await users.findOneAndUpdate({ _id }, { uname, interests, bio, profilePic: newProfilePic })
        res.status(200).json("Account updated successfully")
    }
    catch (err) {
        console.log(err);
        res.status(401).json(err)
    }
}