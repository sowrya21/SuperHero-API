const Hero = require("../models/hero")
const createHero=async(req,res)=>{
try{

 const createHero = await Hero.create({
    heroname:req.body.heroname,
    power:req.body.power,
    description:req.body.description,
    image:req.file.path,
    createdBy:req.user.id
   
    
 });
 res.status(201).json({
    message: "SuperHero is added",
    createHero
 })

}catch(err){
res.status(500).json({
    message: err,
    
 })
}
}
const getHeroes = async (req,res)=>{
    try{

        const heroes = await Hero.find({
            createdBy: req.user.id
        });

        res.json(heroes);

    }catch(err){
        res.status(500).json({
            message: err.message
        });
    }
}
const getallHeroes = async (req, res) => {
    try {

        const heroes = await Hero.find();

        res.status(200).json({
            count: heroes.length,
            heroes
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};
const deleteHero = async (req, res) => {
    try {

        const hero = await Hero.findOneAndDelete({
            heroname: req.params.heroname,
            createdBy: req.user.id
        });

        if (!hero) {
            return res.status(404).json({
                message: "Hero not found or unauthorized"
            });
        }

        res.status(200).json({
            message: "Hero deleted successfully",
            hero
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};
const updateHero = async (req, res) => {
    try {
      console.log(req.user);
        const hero = await Hero.findOneAndUpdate(
            {
                heroname: req.params.heroname,
                createdBy: req.user.id
            },
            {
                heroname: req.body.heroname,
                power: req.body.power,
                description: req.body.description
            },
            {
                new: true
            }
        );

        if (!hero) {
            return res.status(404).json({
                message: "Hero not found"
            });
        }

        res.status(200).json({
            message: "Hero updated successfully",
            hero
        });

    } catch(err){
    console.log("ERROR:", err);

    res.status(500).json({
        message: err.message
    });
}
};
module.exports={createHero,getHeroes,getallHeroes,deleteHero,updateHero}