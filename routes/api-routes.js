// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

var multer = require("multer");
var path = require("path")
var passport = require('passport');


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) //Appending file extention
  }
})

var upload = multer({ storage: storage })
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

app.get("/", function(req, res){
  db.Pin.findAll({}).then(function(result){
    hbsArray = result.filter(obj => obj.dataValues)
    console.log(hbsArray)
    var hbsObject = {
      files: hbsArray
    }
   res.render("index", hbsObject)
  })
})

app.get("/api/users", function(req, res){
  db.User.findAll({}).then(function(result){
    res.json(result)
  })
})

app.get("/api/pins/", function(req, res){
  db.Pin.findAll({
  }).then(function(result){
    res.json(result)
  })
})

app.get("/api/pins/:category", function(req, res){

  db.Pin.findAll({
    where: {
      category: req.params.category
    }
  }).then(function(result){
    res.json(result)
  })
})

app.get("/board", function(req, res){
  res.redirect("/api/boards/" + req.user.id)
})

app.get("/api/boards", function(req, res){
  db.Board.findAll({}).then(function(result){
    res.json(result)
  })
})

app.get("/api/boards/:userid", function(req, res){
  db.Board.findAll({
    where: {
      user_id: req.params.userid,
    }
  }).then(function(result){
    res.json(result)
  })
})

app.get("/api/boards/:boardname", function (req, res){
  db.Boards.findOne({
    where: {
      id: req.params.userid,
      boardname: req.params.boardname
    }
  }).then(function(result){
    res.json(result)
  })
})

app.post("/api/board/:pinid", function (req, res){
  //Update the user to add this to their board
  db.Board.create({
    category: req.body.category,
    user_id: req.user.id,
    pin_id: req.body.pinId
  })
})

app.post("/api/board/:pinid", function (req,res){
//Take user data and create a board,
  db.Board.create({
    userid: req.user.id,
    category: req.body.category,
    pin_id: req.params.pinid
  }).then(function(result){
    console.log(result)
  });

})

app.post('/api/upload', upload.any(), function (req, res) {

  console.log(req)

  var title = req.body.title
  var description = req.body.description
  var category = req.body.category

  console.log("Title "+ title)

	//var filename = req.files[0].originalname;  // This will give renamed file name
  var filepath = req.files[0].path;// This will give file path from current location
  filepath = filepath.split("public/").pop() //Removes the "public/" path from the stored Image location
  filepath = filepath.replace(/\\/g,"&#92;"); // This will replace 'backslash' with it's ASCII code in path
	//var filetype = req.files[0].mimetype;  // This will give mimetype of file

	// res.setHeader( 'content-type', 'application/json' );

  db.Pin.create({
    title: title,
    description: description,
    uploaded_by: req.user.id,
    category: category,
    filepath: filepath
  }).then(function(dbPost) {
    res.json({success : "Updated Successfully", status : 200})
  })
})

app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {

    // db.User.create({
    // }).then(function(result){
    //   res.redirect('/');
    // })
    console.log(req.user)
    res.redirect('/')
  });

};

