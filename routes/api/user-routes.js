//First letter that is a capital means it is a Class/Datatype.
//() means it is a constructor because Router is the name of a class and it is being used as a functions.
const router = require("express").Router();
const userController = require("../../controllers/users-controller");
const withAuth = require("../../utils/auth");

var multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

var upload = multer({
  storage: storage,
}).single("file");

// GET /api/users
router.get("/", withAuth, userController.loadAllUsersPage);

// GET /api/users/1
router.get("/:id", withAuth, userController.loadSingleUserPage);

router.get("/musicians", withAuth, userController.loadAllUsersPage);

//do not use withAuth here
// POST /api/users (Note to self: Post is a way to send information to the server after the request is sent - without any relation to the URL. )
router.post("/", upload, userController.createUser);

// PUT /api/users/1
router.put("/:id", withAuth,userController.updateUser);

// DELETE /api/users/1
router.delete("/:id", withAuth,userController.deleteUser);

// router.get("/login", userController.loadLoginPage);
//
router.post("/login", userController.login);

router.post("/logout", userController.logout);

// router.get("/signup", userController.loadSignUpPage);

module.exports = router;
