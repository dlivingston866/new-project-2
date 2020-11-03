let passport = require("passport");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;

passport.use(
  new localStrategy(
    {
      usernameField: "username",
    },

    (username, password, done) => {
      User.collection.findOne({ username: username }, (err, user) => {
        if (err) throw err;
        if (!user) return done(null, false);
        if (user.password == password) {
          return done(null, user);
        } else {
          return done(null, false);
        }

        /*bcrypt.compare(password, user.password, (err, result) => {
          if (err) throw err;
          if (result === true) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });*/
      });
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user._id);
});
passport.deserializeUser((id, cb) => {
  User.collection.findOne({ _id: id }, (err, user) => {
    cb(err, user);
  });
});
module.exports = passport;
