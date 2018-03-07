const dotenv = require('dotenv').config()
var multer = require('multer')
const img = require('easyimage');
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
var models = require("./models");
var db = models.db
var Op = models.Op
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var session = require("express-session");
var cookieParser = require('cookie-parser')

var PORT = process.env.PORT || 3000;

const app = express();
app.use(cookieParser())

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(path.join(__dirname, "public")));

app.use(session({ secret: 'keyboard cat' }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ 
  defaultLayout: 'main', 
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/' 
  }));
app.set("view engine", "handlebars");

app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/callback"
},
function(accessToken, refreshToken, profile, done) {
  if (profile) {
    user = profile;
    console.log(user)
    return done(null, user);
    }
    else {
    return done(null, false);
    }
}
));


passport.serializeUser(function(user, done) {
  done(null, user);
});


passport.deserializeUser(function(user, done) {
  done(null, user);
});

// Routes
// =============================================================
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================

db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("Sequelize listening on PORT " + PORT);
  });
});


