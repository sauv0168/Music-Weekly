const { Users, Post, Comment} = require("../models");
const helpers = require("../utils/helpers");

module.exports = {
  loadHomePage:(req, res) => {
    //if logged in, do not show register page, instead go to blog
    if(req.session.loggedIn){
      res.redirect('/blog');
    }
    res.render("register", {loggedIn: req.session.loggedIn ? true : false});
  },
  loadBlogPage:(req, res) => {
   // res.render("blog", {loggedIn: req.session.loggedIn ? true : false});
      Post.findAll({
          // Query configuration
          attributes: ["id", "title", "created_at", "content_txt", "attached_file"],
          //Join the user tables
          include: [
              Users,
              {
                  model: Comment,
                  include: [Users],
              },
          ],
          where: {
            type: "blog"
          }
      })
          .then((dbPostData) => {
              const posts = dbPostData.map((post) => post.get({ plain: true }));
              console.log(">>>>>LOOK HERE" + JSON.stringify(dbPostData));
              res.render("posts", {
                  posts,
                  loggedIn: req.session.loggedIn ? true : false,
                  helpers ,
                  form_title: "Write a blog post!",
                  label_title: "Title",
                  label_content: "Content",
                  type: "blog",
                  file_included: false,
              });
          })
          .catch((err) => {
              console.log(err);
              res.status(500).json(err);
          });

  },
  loadMusiciansPage: (req, res) => {
    Users.findAll({
      attributes: { exclude: ["password"] },
    })
        .then((dbUsersData) => {
          const musicians = dbUsersData.map((user) => user.get({ plain: true }));

          console.log("LOAD MUSICIANS PAGE");

          console.log(">>>>>LOAD MUSICIANS PAGE");

          res.render("musicians", { musicians, loggedIn:req.session.loggedIn ? true : false  });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        })},
  loadClassroomPage:(req, res) => {
    Post.findAll({
      // Query configuration

      attributes: ["id", "title", "created_at", "content_txt", "attached_type"],

      attributes: ["id", "title", "created_at", "content_txt", "attached_file"],

      //Join the user tables
        include: [
            Users,
            {
                model: Comment,
                include: [Users],
            },
        ],
            where: {
                type: "challenge"
            }

    })

        .then((dbPostData) => {
          const posts = dbPostData.map((post) => post.get({ plain: true }));
          console.log(">>>>>LOOK HERE" + JSON.stringify(dbPostData));
          res.render("posts", {
              posts,
              loggedIn: req.session.loggedIn ? true : false,
              helpers ,
              form_title: "Describe your challenge!!!",
              label_title: "Prompt",
              label_content: "Challenge",
              type: "challenge",
              file_included: true,
          });

        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
  },
  loadLoginPage:(req, res) => {
    res.render("login");
  },
};
