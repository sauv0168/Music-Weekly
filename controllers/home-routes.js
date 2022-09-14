const router = require("express").Router();
const { Post, Comment, Users } = require("../models/");

// get all posts for homepage
router.get("/", (req, res) => {
  Post.findAll({
    include: [Users],
  })
    .then((dbPostData) => {
      const posts = dbPostData.map((post) => post.get({ plain: true }));

      res.render("all-posts", { posts, loggedIn: req.session.loggedIn });
      console.log("THIS IS ALL POST");
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// get single post
router.get("/post/:id", (req, res) => {
  Post.findByPk(req.params.id, {
    include: [
      Users,
      {
        model: Comment,
        include: [Users],
      },
    ],
  })
    .then((dbPostData) => {
      if (dbPostData) {
        const post = dbPostData.get({ plain: true });
        console.log("aHEEEEEEEEEEEEEEEEEEEEEEEEEERE");
        res.render("single-post", { post, loggedIn: req.session.loggedIn });
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("signup");
});

module.exports = router;
