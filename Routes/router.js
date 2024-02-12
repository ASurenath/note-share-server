const express=require('express')
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
const { register, login, getUserData, changePassword, deleteUser, editUser } = require('../Controllers/userController')
const { addNote, getAllNotes, getMyNotes, editNote, deleteNote, addToFav, removeFromFav } = require('../Controllers/noteController')
const multerConfig = require('../Middlewares/multerMiddleware')


const router=new express.Router()
router.post('/register',register)
router.post('/login',login)
router.get('/user',jwtMiddleware,getUserData)
router.put('/password',jwtMiddleware,changePassword)
router.delete('/delete-user',jwtMiddleware,deleteUser)
router.put('/user/edit',jwtMiddleware,multerConfig.single('profileImage'),editUser)

router.post('/notes',jwtMiddleware,addNote)
router.get('/notes',jwtMiddleware,getAllNotes)
router.get('/my-notes',jwtMiddleware,getMyNotes)
router.put('/notes',jwtMiddleware,editNote)
router.delete('/notes',jwtMiddleware,deleteNote)
router.put('/add-fav',jwtMiddleware,addToFav)
router.put('/remove-fav',jwtMiddleware,removeFromFav)

module.exports=router