const multer=require('multer')

const storage=multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'./uploads')
    },
    filename:(req,file,callback)=>{
        const filename=`image_${Date.now()}_${file.originalname}`
        callback(null,filename)
    }

})

const multerConfig=multer({
    storage
})
module.exports=multerConfig