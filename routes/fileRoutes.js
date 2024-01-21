const express=require("express");
router=express.Router();
const {postFile,downloadFile}=require("../controller/fileController")

router.post("/",postFile);
router.get("/:uuid",downloadFile);


module.exports= router;