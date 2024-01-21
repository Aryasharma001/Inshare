const express=require('express');
const app=express();
const dotenv = require("dotenv").config();
const dbConnect=require("./config/dbConnect");
dbConnect();
const fileRouter=require("./routes/fileRoutes");

app.use('/api/file',fileRouter);




app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
});                                                                             
