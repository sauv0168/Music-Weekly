var express = require('express');
var router = express.Router();
var multer  = require('multer');
const withAuth = require("../../utils/auth");
 
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+file.originalname)
    }
  })
 
var upload = multer({ 
    storage:storage
 }).single('file');
 
router.get('/',function(req,res){
  res.sendFile(__dirname + '/index.html');
 
});
router.post("/upload",upload.single('file'),function(req,res){
   
const filename=req.file.filename;
 res.json({
            message:"Image Uploaded Successfully",
            filename:filename
        });
    });
 
module.exports=router;