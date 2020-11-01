const User = require("../models/user");
const passport = require("../config/passportConfig");

module.exports = function (app) {
  app.post("/register", passport.authenticate("local"), function (req, res) {
    console.log(req);
    res.json({
      test: "string",
    });
  });
};
