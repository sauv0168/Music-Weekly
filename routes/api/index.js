const router = require("express").Router();
const userRoutes = require("./user-routes.js");
const commentRoutes = require("./comment-routes.js");
const postRoutes = require("./api-post-routes.js");

router.use("/users", userRoutes);
router.use("/musicians", userRoutes);
router.use("/comment", commentRoutes);
router.use("/posts", postRoutes);

module.exports = router;
