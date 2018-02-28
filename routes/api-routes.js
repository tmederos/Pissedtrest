// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

var multer = require("multer");
var path = require("path")

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

  db.FileData.findAll({}).then(function(result){
    var hbsObject = {
      files: result
    }
    res.render("index", hbsObject)
  })
})

app.post('/api/upload', upload.any(), function (req, res) {

  console.log(req.files)
	
	var filename = req.files[0].originalname;  // This will give renamed file name
  var filepath = req.files[0].path;// This will give file path from current location
  filepath = filepath.split("public/").pop() //Removes the "public/" path from the stored Image location
  filepath = filepath.replace(/\\/g,"&#92;"); // This will replace 'backslash' with it's ASCII code in path
	var filetype = req.files[0].mimetype;  // This will give mimetype of file
		
	res.setHeader( 'content-type', 'application/json' );

  db.FileData.create({
    filename: filename,
    filepath: filepath,
    filetype: filetype
  }).then(function(dbPost) {
    res.json(dbPost)
  })
})

};
    