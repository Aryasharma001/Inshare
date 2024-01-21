const asyncHandler = require("express-async-handler");
const multer = require("multer");
const path = require('path');
const File = require("../models/file");
const { v4: uuid4 } = require("uuid");

let storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
          cb(null, uniqueName)
} ,
});

let upload = multer({
  storage,
  limit: { fileSize: 1000000 * 100 },
}).single("File");

const postFile = asyncHandler(async (req, res) => {
    // store the file
    upload(req, res, async (err) => {
      // check if there is an error during file upload
      if (err) {
        return res.status(500).send({ error: err.message });
      }
  
      // check if there is a file or not
      if (!req.file) {
        return res.json({ error: "No file uploaded" });
      }
  
      // store the file in the database
      const file = new File({
        filename: req.file.filename,
        uuid: uuid4(),
        path: req.file.path,
        size: req.file.size,
      });
  
      // response -> link
      const response = await file.save();
      return res.json({
        file: `${process.env.APP_BASE_URL}/api/file/${response.uuid}`,
      });
    });
  });

  const downloadFile=asyncHandler(async (req,res)=>{
    try{
        const uuid=req.params.uuid;
        const file=await File.findOne({uuid:uuid});
        if(!file){
            return res.render('download',{error:"link has been expired"})
        }
        else{
            return res.render('download',{
                fileName:file.filename,
                uuid:file.uuid,
                fileSize:file.size,
                downloadLink:`${process.env.APP_BASE_URL}/files/download/${file.uuid}`

            })
        }

    }
    catch(err){
        return res.render('download',{error:"something went wrong."})
    }


  })
  

module.exports = { postFile ,downloadFile};
