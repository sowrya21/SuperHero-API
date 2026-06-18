require("dotenv").config();
const express=require("express");
const app=express()
const connectDb=require("./config/db")
const passport=require("./middleware/passport")
const userRoute=require("./router/AuthRouter")
const HeroRoute=require("./router/heroRouter")
app.use(express.json())
app.use(passport.initialize());
app.use("/uploads",express.static("uploads"))
app.use("/",userRoute)
app.use("/",HeroRoute)


app.get("/", (req, res) => {
    res.send("SuperHero API is Running ");
});
connectDb()
app.listen(3002,(req,res)=>{
    console.log("server started");
})