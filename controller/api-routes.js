const User = require("../models/user");
const passport = require("../config/passportConfig");
const cors = require("cors");
const passportLocal = require("passport-local");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const Post = require("../models/post");

module.exports = function (app) {
  app.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) throw err;
      if (!user) res.send("No User Exists");
      else {
        req.login(user, (err) => {
          if (err) throw err;
          res.json({
            id: req.user._id,
            username: req.user.username,
          });
          console.log(req.user);
        });
      }
    })(req, res, next);
  });

  app.post("/register", (req, res) => {
    User.collection.findOne({ username: req.body.username }, (err, doc) => {
      if (err) throw err;
      if (doc) res.send("User Already Exists");
      if (!doc) {
        User.collection.insertOne(req.body).then((user) => {
          res.send("User Created");
        });
      }
    });
  });
  app.post("/post", (req, res) => {
    Post.collection.insertOne(req.body, (err, doc) => {
      if (err) throw err;
      res.send("Post Saved");
    });
  });
  app.get("/posts/:id", (req, res) => {
    let id = req.params.id;
    console.log(id);
    Post.find({ user: id })
      .then((data) => {
        // if (err) throw err;
        console.log(data);
        res.json(data);
      })
      .catch((err) => console.log(err));
  });
  app.get("/user", (req, res) => {
    res.send(req, user); // The req.user stores the entire user-------
  });
};
