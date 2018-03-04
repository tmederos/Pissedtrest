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
var models = require("../models");
var db = models.db
var Op = models.Op
// Routes
// =============================================================
module.exports = function(app) {

app.get("/", function(req, res){
  db.Pin.findAll({}).then(function(result){
    var hbsObject = {
      pins: result
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
  // var hbsObject = {
  //   boards: result
  // }
  db.Pin.findAll({
    where: {
      category: req.params.category
    }
  }).then(function(result){
    res.json(result)
  })
})

app.get("/api/boards", function(req, res){

  db.Board.findAll({
    where: {
      user_id: req.user.id,
    }
  }).then(function(result){
    var hbsObject = {
      boards: result
    }
    console.log(result)
    res.render("partials/boards/boards-partial.handlebars", hbsObject)
  })
})

app.get("/boards/:userid", function(req, res){
  db.Board.findAll({
    attributes: ['category'],
    where: {
      user_id: req.params.userid,
    },
    group: ['category']
  }).then(function(result){
    console.log(result)
    var hbsObject = {
      boards: result
    }
   res.render("boards", hbsObject)
  })
})

app.get("/boards/:userid/:category", function (req, res){
  var category = decodeURI(req.params.category)
  db.Board.findAll({
    attributes: ["id"],
    where: {
      category: category,
      user_id: req.params.userid
    }
  }).then(function(result){
    idArray = []
    result.forEach(function(item){
      idArray.push(item.dataValues.id)
    })
    console.log(idArray)
    db.Pin.findAll({
      where: {
        id: {
          [Op.or]: idArray
        }
      }
    }).then(function(result){
      console.log(result)
      var hbsObject = {
      pins: result
    }
      res.render("pins", hbsObject)
    })
  })
});

app.post("/api/boards", function (req, res){
  //Update the user to add this to their board
  db.Board.create({
    category: req.body.category,
    user_id: req.user.id,
    pin_id: req.body.pinId
  }).then(function(result){
    res.json({success : "Added Successfully", status : 200})
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

app.get("/search/:query", function(req, res) {
  var searchQuery = decodeURI(req.params.query)
  db.Pin.findAll({
    where: {
      category: searchQuery
    }
  }).then(function(result){
    var hbsObject = {
      pins: result
    }
    res.render("pins", hbsObject)
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

    db.User.findOrCreate({
      where: {  
        user_id: req.user.id
        }
    }).then(function(result){
      console.log(result)
      res.redirect('/');
    })
   
  });

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

app.get('/api/user_data', function(req, res) {
  
  // if (req.user === undefined) {
  //     // The user is not logged in
  //     res.json({});
  // } else {
  //     res.json({
  //         userid: req.user.id
  //     });
  // }
  res.send(req.user)
});

};

