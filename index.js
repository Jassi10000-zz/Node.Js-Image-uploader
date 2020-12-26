const express = require("express");
const app = express();
const path = require('path');

//creating middleware
const multer = require('multer');


    //let's maintain the storage
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {  // this callback func "cb" determines where we will store our images
            cb(null, 'images')
        },
        filename: (req,file,cb) => {
            console.log(file);
            cb(null, Date.now + path.extname(file.originalname)) 
            // as there may be different files but can have same name
            // so to differentiate we are classifying them on the basis of date
        }

    }) //everything related to uploading will be stored our disk


    
    const upload = multer({storage: storage});  //so basically this line created the middleware
                //   ^
                //   |
                // multer object   and same is storage object which contains all info of the storage

app.set("view engine" , "ejs");

app.set("views", __dirname + "/views");

app.get("/upload",(req,res) => {
    res.render('upload');
});

app.post("/upload",upload.single('image'),(req,res) => {
// as upload can upload single as well as multiple files
//inside upload.single('')-->name of the input from where we grabbed the file
    res.send("Congratulations !! Post upload");
});

var PORT = 3001;
app.listen(PORT,() =>{
    
    console.log('Listening at port' ,PORT);
});