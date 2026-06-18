const User=require("../models/Auth")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")

const register=async(req,res)=>{
try{

    const existingUser=await User.findOne({email:req.body.email})
if(existingUser){
    return res.status(400).json({
        message:"user already exists"
    })
}
const salt = bcrypt.genSaltSync(10);
const hashpswd = await bcrypt.hash(req.body.password, salt);

    const user =await User.create({
        name:req.body.name,
        email:req.body.email,
        password:hashpswd


});
res.status(201).json({
    message:"user added"
})
}catch(err){
    console.log(err);

    res.status(500).json({
        message: err.message
    });


}
}
const login=async(req,res)=>{
    try{
         const user=await User.findOne({email:req.body.email})

        if(!user){
            return res.status(400).json({
                message:"user not found"
            })
        }


const isMatch=bcrypt.compareSync(req.body.password, user.password);
if (!isMatch) {
    return res.status(400).json({
        message: "Incorrect password"
    });
}
const token=jwt.sign(
    {
        id:user._id,
        email:user.email
    },process.env.JWT_SECRET,
    {

        expiresIn:"3d"
    }
    
)
return res.status(200).json({
    message:"login succesful",token
})


    }catch(err){
        res.status(400).json({
            message:"in correct password"
        })

    }
}
module.exports={register,login}
