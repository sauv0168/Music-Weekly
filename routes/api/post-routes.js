const router = require("express").Router();
const withAuth = require("../../utils/auth");
const postController = require("../../controllers/post-controller");

// get all posts
router.get("/", withAuth, postController.loadAllPostsPage);

router.post("/", withAuth, postController.createPost);

// get single post
router.get("/post/:id", withAuth, postController.loadSinglePostPage);
module.exports = router;
