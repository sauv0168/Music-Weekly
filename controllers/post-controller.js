const { Post, Users, Comment } = require("../models");
const helpers = require("../utils/helpers");
const postController = {
  loadAllPostsPage: (req, res) => {
    console.log("======================");
    Post.findAll({
      // Query configuration
      attributes: ["id", "post_url", "title", "created_at"],
      //Join the user tables
      include: [
        {
          model: Users,
          attributes: ["username"],
        },
      ],
    })
      .then((dbPostData) => res.json(dbPostData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  createPost: (req, res) => {
    console.log(">>>>>FILE: " + req.file);
    Post.create({
      title: req.body.title,
      content_txt: req.body.content_txt,

      attached_file: req.body.attached_file,
      user_id: req.session.user_id,
      type: req.body.type
    })
      .then((dbPostData) => {
        //res.json(dbPostData);
        if(req.body.type === "blog"){
          res.redirect("/blog");
        }
        else if(req.body.type === "challenge"){
          res.redirect("/classroom");
        }

      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  loadSinglePostPage: (req, res) => {
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
          console.log(">>>>>FOUND POST.comments: " + JSON.stringify(post.comments));
          //loggedIn is sent because it is used by main.handlebars
          res.render("single-post", {
            post,
            loggedIn: (req.session.loggedIn ? true : false),
            helpers,
          });
        } else {
          res.status(404).end();
        }
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
};

module.exports = postController;
