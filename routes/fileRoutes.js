const express=require("express");
router=express.Router();
const {postFile,getDownloadFile,downloadFile}=require("../controller/fileController")

router.post("/",postFile);
router.get("/:uuid",getDownloadFile);
router.get("/download/:uuid",downloadFile);


module.exports= router;