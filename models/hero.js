const mongoose=require("mongoose");

const heroSchema=new mongoose.Schema({
   heroname:{
        type:String,
    },
    power:{
        type:Number
    },
    description:{
        type:String,
    },
    image:{
        type:String
    },createdBy: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "User"

    }
    
    
});

module.exports=mongoose.model("Hero",heroSchema);