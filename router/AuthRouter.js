const express=require("express")
const {register,login} = require("../controller/AuthController")
const router=express.Router()
const passport = require("passport");
router.get(
    "/profile",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        res.json({
            message: "Authorized",
            user: req.user
        });
    }
);
router.post("/register",register)
router.post("/login",login)
module.exports=router;