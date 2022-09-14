const { Users } = require("../models");

const usersController = {
  loadAllUsersPage: (req, res) => {
    Users.findAll({
      attributes: { exclude: ["password"] },
    })
      .then((dbUsersData) => {
        console.log(dbUsersData.get({ plain: true }));
        const musicians = dbUsersData.map((user) => user.get({ plain: true }));
        res.render("musicians", { musicians });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  loadSingleUserPage: (req, res) => {
    console.log(req);
    Users.findOne({
      attributes: { exclude: ["password"] },
      where: {
        id: req.params.id,
      },
    })
      .then((dbUsersData) => {
        if (!dbUsersData) {
          res.status(404).json({ message: "No user found with this id" });
          return;
        }
        res.json(dbUsersData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  updateUser: (req, res) => {
    // expects {username: 'Lernantino', password: 'password1234'}

    // if req.body has exact key/value pairs to match the model, you can just use `req.body` instead
    Users.update(req.body, {
      //Ensures the hook gets used
      individualHooks: true,
      where: {
        id: req.params.id,
      },
    })
      .then((dbUsersData) => {
        if (!dbUsersData[0]) {
          res.status(404).json({ message: "No user found with this id" });
          return;
        }
        res.json(dbUsersData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  deleteUser: (req, res) => {
    Users.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((dbUsersData) => {
        if (!dbUsersData) {
          res.status(404).json({ message: "No user found with this id" });
          return;
        }
        res.json(dbUsersData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  createUser: (req, res) => {
    Users.create({
      username: req.body.Username,
      password: req.body.password[0],
      email: req.body.email,
      bio: req.body.bio,
      image: req.file.filename,
    })
      .then((dbUsersData) => {
        req.session.save(() => {
          req.session.user_id = dbUsersData.id;
          req.session.username = dbUsersData.username;
          req.session.loggedIn = true;

          //redirect to the login page because we successfully created a user
          res.redirect("/blog");
        });


      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  loadLoginPage: (req, res) => {
    if (req.session.loggedIn) {
      res.redirect("/");
      return;
    }

    res.render("login");
  },

  login: (req, res) => {
    // expects {username: 'lernant', password: 'password1234'}
    Users.findOne({
      where: {
        email: req.body.email,
      },
    })
      .then((dbUsersData) => {
        if (!dbUsersData) {
          res.status(400).json({ message: "No user with that name!" });
          return;
        }

        //res.json({ user: dbUserData });

        // Verify user
        const isValidPassword = dbUsersData.checkPassword(req.body.password);
        if (!isValidPassword) {
          res.status(400).json({ message: "Incorrect password!" });
          return;
        }
        req.session.save(() => {
          req.session.user_id = dbUsersData.id;
          req.session.username = dbUsersData.username;
          req.session.loggedIn = true;

          res.json({
            user: dbUsersData,
            message: "You are now logged in",
          });
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  logout: (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  },

  loadSignUpPage: (req, res) => {
    if (req.session.loggedIn) {
      res.redirect("/");
      return;
    }

    res.render("signup");
  },
};
module.exports = usersController;
