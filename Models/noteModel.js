const mongoose = require('mongoose')
const ObjectId = require('mongodb').ObjectId;

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
    },
    author: {
        type: ObjectId,
        required: true,
    },
    creationTime: {
        type: String,
        required: true,
    },
    favouriteOf: {
        type: Array
    }
})

const notes = mongoose.model("notes", noteSchema)
module.exports = notes