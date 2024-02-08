const users=require('../Models/userModel')
const jwt=require('jsonwebtoken')
const ObjectId = require('mongodb').ObjectId;

///Register controller
exports.register=async (req,res)=>{
    console.log("inside register api");
    const { uname, email, password } = req.body
    console.log(uname, email, password);
    try {
        const existingUser = await users.findOne({ email })
        console.log("Existing user:",existingUser)
        if (existingUser) {
            res.status(406).json("Email already registered with us. Please Login.")
        }
        else {
            const newUser = new users({
                uname, email, password, interests:"", bio:"", profilePic:""
            })
            await newUser.save()
            console.log(newUser);
            const token=jwt.sign({userId:newUser._id},process.env.JWT_SECRET_KEY)
            res.status(200).json({user:{...newUser["_doc"],"password":""},token})
        }
    }
    catch (err) {
        res.status(401).json(err)
    }
}

/////login

exports.login=async (req,res)=>{
    console.log("inside login API");
    const { email, password } = req.body
    console.log( email, password);
    try {
        const existingUser = await users.findOne({ email,password })
        console.log(existingUser)
        if (existingUser) {
            const token=jwt.sign({userId:existingUser._id},process.env.JWT_SECRET_KEY)
            res.status(200).json({"user":{...existingUser["_doc"],"password":""},token})
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
        const user = await users.findOne({_id})
        res.status(200).json(user)
    }
    catch (err) {
        console.log(err);
        res.status(401).json(err)
    }
}
