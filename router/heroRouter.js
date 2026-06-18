const express=require("express")
const router=express.Router();
const multer = require("multer");

const { CloudinaryStorage } = require("multer-storage-cloudinary");

const cloudinary = require("../config/cloudinary");

const auth = require("../middleware/AuthMiddleware");
const {createHero,getHeroes,getallHeroes,deleteHero,updateHero}=require("../controller/heroController");
const storage = new CloudinaryStorage({

    cloudinary: cloudinary,

    params: {

        folder: "superheroes",

        allowed_formats: ["jpg", "jpeg", "png", "gif", "webp", "bmp"]

    }

});

const upload = multer({

    storage: storage

});
router.post("/add/heros",auth,upload.single("image"),createHero);
router.get("/get/heros",auth,getHeroes

);
router.get("/get/allheros",auth,getallHeroes

);
router.delete("/delete/heros/:heroname",auth,deleteHero

);
router.put(
    "/update/heros/:heroname",
    auth,
    updateHero
);
module.exports=router;