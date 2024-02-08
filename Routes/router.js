const express=require('express')
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
const { register, login, getUserData } = require('../Controllers/userController')
const { addNote, getAllNotes, getMyNotes, editNote, deleteNote, addToFav, removeFromFav } = require('../Controllers/noteController')


const router=new express.Router()
router.post('/register',register)
router.post('/login',login)
router.post('/notes',jwtMiddleware,addNote)
router.get('/notes',jwtMiddleware,getAllNotes)
router.get('/my-notes',jwtMiddleware,getMyNotes)
router.put('/notes',jwtMiddleware,editNote)
router.delete('/notes',jwtMiddleware,deleteNote)
router.get('/user',jwtMiddleware,getUserData)
router.put('/add-fav',jwtMiddleware,addToFav)
router.put('/remove-fav',jwtMiddleware,removeFromFav)

module.exports=router