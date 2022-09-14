const router = require("express").Router();
const postController = require("../../controllers/post-controller");
const withAuth = require("../../utils/auth");

var multer  = require('multer');

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

router.post("/",  upload, postController.createPost);

module.exports = router;
