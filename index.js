const express=require('express');
const app=express();
const dotenv = require("dotenv").config();
const dbConnect=require("./config/dbConnect");
const ejs=require('ejs');
const path=require('path');
dbConnect();
const fileRouter=require("./routes/fileRoutes");
app.use(express.json());
app.use(express.static(__dirname + "/public"));

// view engine
app.set('views',path.resolve(__dirname,'./views'));
app.set('view engine','ejs');

app.use('/api/file',fileRouter);




app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
});                                                                             
