const mongoose=require('mongoose')
const connectionString=process.env.CONNECTION_STRING

mongoose.connect(connectionString).then(()=>{
        console.log("MongoDB Atlas connected successfully with pfServer");
}).catch((reason)=>{
    console.log(reason);
    console.log("MongoDB connection failed");
})