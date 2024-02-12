require('dotenv').config()
const express=require('express')
const cors=require('cors')
const router=require('./Routes/router')
require('./DB/connection')

///express server
const nsServer=express()

//1. use cors in server
nsServer.use(cors())
//2. use json parser - application specific middleware
nsServer.use(express.json())

nsServer.use('/uploads',express.static('./uploads'))
//3. use router
nsServer.use(router)

PORT=3000

nsServer.listen(PORT,()=>{
    console.log("nsServer listening at port 3000");
})

//to resolve http GET request to loacalhost:3000

nsServer.get('/',(req,res)=>{
    res.send("<h1 style=color:teal;text-align:center>NoteShare server waiting for client request</h1>")
})
