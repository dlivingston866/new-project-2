const User = require("../models/user");
const passport = require("../config/passportConfig");
const cors = require("cors");
const passportLocal = require("passport-local");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");

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
        //const hashedPassword = await bcrypt.hash(req.body.password, 10);
        User.collection.insertOne(req.body).then((user) => {
          res.send("User Created");
        });
        /* const newUser = new User({
          username: req.body.username,
          password: req.body.password,
        });
        await newUser.save();
        res.send("User Created");*/
      }
    });
  });
  app.get("/user", (req, res) => {
    res.send(req, user); // The req.user stores the entire user-------
  });

  /*app.post("/register", passport.authenticate("local"), function (req, res) {
    console.log(req);
    res.json({
      test: "string",
    });
  });*/
};
