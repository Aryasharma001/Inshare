const express=require("express");
router=express.Router();
const {postFile}=require("../controller/fileController")

router.post("/",postFile);


module.exports= router;