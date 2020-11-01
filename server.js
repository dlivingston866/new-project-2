const express = require("express");
const session = require("express-session");
const pass = require("passport");
const passport = require("./config/passportConfig")(pass);
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const mongoose = require("mongoose");

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// Send every request to the React app
// Define any API routes before this runs
/*app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});*/
require("./controller/api-routes")(app);

mongoose.connect(
  process.env.MONGODB_URI ||
    "mongodb+srv://Admin:admin1@cluster0.wwxds.mongodb.net/Cluster0?retryWrites=true&w=majority"
);

app.listen(PORT, function () {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
