const notes = require('../Models/noteModel')
const jwt = require('jsonwebtoken')
const ObjectId = require('mongodb').ObjectId;


///add note controller
exports.addNote = async (req, res) => {
    console.log("inside add note api");
    const { title, creationTime } = req.body
    const author = new ObjectId(req.payload)
    console.log(title, creationTime, author);
    try {
        const newNote = new notes({
            title, content: "", creationTime, author, favouriteOf: []
        })
        await newNote.save()
        console.log(newNote);
        res.status(200).json(title)
    }
    catch (err) {
        res.status(401).json(err)
    }
}

//// get All notes
exports.getAllNotes = async (req, res) => {
    console.log("inside get All notes api");
    try {
        const allNotes = await notes.aggregate([
            {
                $lookup:
                {
                    from: "users",
                    localField: "author",
                    foreignField: "_id",
                    as: "authorDetails"
                }
            },
            {
                $project:
                {
                    "authorDetails.password": 0,
                    "authorDetails.email": 0,
                    "authorDetails.favourites": 0
                }
            },
            {
                $sort: {
                    "creationTime": -1
                }
            }
        ])
        res.status(200).json(allNotes)
    }
    catch (err) {
        console.log(err);
        res.status(401).json(err)
    }
}

//// get my notes
exports.getMyNotes = async (req, res) => {
    console.log("inside get my notes api");
    const author = new ObjectId(req.payload)
    try {
        const myNotes = await notes.find({ author }).sort({ creationTime: 'desc' })
        res.status(200).json(myNotes)
    }
    catch (err) {
        console.log(err);
        res.status(401).json(err)
    }
}

//// edit note
exports.editNote = async (req, res) => {
    console.log("inside edit api");
    const { _id,title, content } = req.body
    const author = new ObjectId(req.payload)
    try {
        const note = await notes.findOneAndUpdate({ _id, author }, { title, content })
        res.status(200).json(note)
    }
    catch (err) {
        console.log(err);
        res.status(401).json(err)
    }
}

//// delete note
exports.deleteNote = async (req, res) => {
    console.log("inside delete note api");
    const { _id } = req.body
    const author = new ObjectId(req.payload)
    try {
        const note = await notes.deleteOne({ _id, author })
        res.status(200).json(note)
    }
    catch (err) {
        console.log(err);
        res.status(401).json(err)
    }
}

//// add to fav
exports.addToFav = async (req, res) => {
    console.log("inside add to fav api");
    const { _id } = req.body
    const userId = new ObjectId(req.payload)
    try {
        const note = await notes.updateOne(
            { _id },
            { $push: { favouriteOf: userId } }
        )
        res.status(200).json(note)
    }
    catch (err) {
        console.log(err);
        res.status(401).json(err)
    }
}

//// remove from fav
exports.removeFromFav = async (req, res) => {
    console.log("inside add to fav api");
    const { _id } = req.body
    const userId = new ObjectId(req.payload)
    try {
        const note = await notes.updateOne(
            { _id },
            { $pull: { favouriteOf: userId } }
        )
        res.status(200).json(note)
    }
    catch (err) {
        console.log(err);
        res.status(401).json(err)
    }
}