const router = require("express").Router();
const withAuth = require("../../utils/auth");
const commentController = require("../../controllers/comment-controller");

router.post("/", withAuth, commentController.createComment);

router.put("/:id", withAuth, commentController.updateComment);
router.delete("/:id", withAuth, commentController.deleteComment);

module.exports = router;
