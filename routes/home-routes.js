const router = require("express").Router();
const homeController = require("../controllers/home-controller");
const withAuth = require("../utils/auth");

router.get("/", homeController.loadHomePage);
router.get("/blog", withAuth, homeController.loadBlogPage);
router.get("/musicians", withAuth, homeController.loadMusiciansPage);
router.get("/classroom", withAuth, homeController.loadClassroomPage);
router.get("/login", homeController.loadLoginPage);
//router.get("*", homeController);

module.exports = router;
