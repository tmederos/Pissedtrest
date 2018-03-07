// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
var aws = require('aws-sdk')
var multer = require("multer");
var multerS3 = require('multer-s3')
var path = require("path")
var passport = require('passport');

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: 'us-west-1'
});

var s3 = new aws.S3()

var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET,
    acl: 'public-read',
    key: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname))
    }
  })
})

var models = require("../models");
var db = models.db
var Op = models.Op
// Routes
// =============================================================
module.exports = function(app) {

app.get("/", function(req, res){
  db.Pin.findAll({
    limit: 20,
    order:[
      ['id', 'DESC']
    ]
  }).then(function(result){
    var hbsObject = {
      homepage: true,
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

app.get("/api/categories/top", function(req, res){
  db.Pin.findAll({
    attributes: ['category', [db.sequelize.fn('COUNT', 'category'), 'count']],
    group: ['category'],
    limit: 6,
    order: [
      [db.sequelize.literal('count'), 'DESC']
    ]
  }).then(function(result){
    res.json(result)
  })
})

app.get("/pins/:category", function(req, res){
  db.Pin.findAll({
    where: {
      category: req.params.category
    }
  }).then(function(result){
    var hbsObject = {
      homepage: false,
      pins: result
    }
    res.render("index", hbsObject)
  })
})

app.get("/api/user/boards", function(req, res){
  db.Board.findAll({
    attributes: ['category'],
    where: {
      user_id: req.user.id,
    },
    group: ['category']
  }).then(function(result){
    var hbsObject = {
      boards: result
    }
    console.log(result)
    res.json(result)
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
    attributes: ["pin_id"],
    where: {
      category: category,
      user_id: req.params.userid
    }
  }).then(function(result){
    idArray = []
    result.forEach(function(item){
      idArray.push(item.dataValues.pin_id)
    })
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

  var title = req.body.title
  var description = req.body.description
  var category = req.body.category

  db.Pin.create({
    title: title,
    description: description,
    uploaded_by: req.user.id,
    category: category,
    filepath: req.files[0].location
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
    res.render("search-results", hbsObject)
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
  
  res.send(req.user)
});

};

