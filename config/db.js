const mongoose = require('mongoose')
const connectDb=async()=>{
    try{
        mongoose.connect("mongodb+srv://phanisowrya21_db_user:Sowrya21@cluster0.ucr5t9y.mongodb.net/?appName=Cluster0")

    console.log("db connected")
}
catch(err){
    console.log(err)
}
}

module.exports=connectDb;