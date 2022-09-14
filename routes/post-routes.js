const router = require("express").Router();
const postController = require("../controllers/post-controller");
const withAuth = require("../utils/auth");

// get all posts
//router.get("/", postController.loadAllPostsPage);

// get single post
router.get("/:id", withAuth, postController.loadSinglePostPage);

module.exports = router;
