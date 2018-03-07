$(document).ready(function() {
var loggedIn;

//Click Handlers//
//-----------------------------------//

//Upload button click handler
$("#nav-upload").on("click", function(){
  if (loggedIn){
    $('#uploadModal').modal('show')
  } else {
    $('#loginModal').modal('show')
  }
})

//My Boards click handler
$("#nav-board").on("click", function(){
if (!loggedIn){
  $('#loginModal').modal('show')
  }
})

//Submit button click handler
$("#btnSubmit").on("click", function (event) {
  event.preventDefault();
  uploadFunction();
})

//Search Button click handler
$("#searchBtn").on("click", function(event){
  event.preventDefault();
  var category = encodeURI($("#category-search").val().trim());
  window.location.href = "/search/" + category

})

//Board button click handler
$(".boardBtn").on("click", function(){
  var category = encodeURI($(this).attr("id"))
  var path = window.location.pathname
  window.location.href = path + "/" + category
})

//Category button click handler
$("#catContainer").on("click", ".categoryBtn", function(){
  console.log("clicked")
  var category = encodeURI($(this).text())
  categorySearch(category);
})

//Pin click handler
$(".pinBtn").on("click", function (event){
if (loggedIn){
  var pinId = $(this).attr("id")
  renderCategories()
  $('#boardModal').modal('show')
  $("#boardSubmit").on("click", function(){
    $("#boardSubmit").prop("disabled", true);
    boardSubmit(pinId)
  })
  } else {
    $('#loginModal').modal('show')  
  }
});

//Functions//
//-----------------------------------//

var boardToggle = function(state){
  if (!state){
    $("#nav-board").attr("href", "#")
  }
}

var loginToggle = function(state){
  if (state){
    $("#nav-login").text("Logout").attr("href", "/logout")
  } else {
    $("#nav-login").text("Login")
  }
}

var loginCheck = function(){
  var userid;
  $.ajax({
    type: "GET",
    url: "/api/user_data"
  }).then(function(result){
    userid = result.id
    loginToggle(userid)
    boardToggle(userid)
    if (userid){
      loggedIn = true
    } else {
      loggedIn = false
    }
  })
}

var renderCategories = function(){
  $.ajax({
    type: "GET",
    url: "/api/user/boards"
  }).then(function(results){
      results.forEach(function(element){
      var option = $("<option>").text(element.category)
      $("#userCategory").append(option)
    })
  })
}

var boardSubmit = function(id){
  var category;
  
    if($('#newBoardInput').val()){
      category = $('#newBoardInput').val()
    }
    else {
      category = $("#userCategory").find(":selected").text();
    }
  
    var postObj = {
      category: category,
      pinId: id
    }

    $.ajax({
      type: "POST",
      data: postObj,
      url: "/api/boards",
      success: function(result) {
        if(result.status == 200){
          $('#boardModal').modal('hide')
          $("#boardSubmit").prop("disabled", false);

        }
        else{
            console.log("Error")
        }
    }
    }).then(function(result){
      console.log(result)
    })
}

var getBoards = function(userid){
  var url
  if (userid){
    url = "/api/boards/" + userid
  }
  else {
    url = "/api/boards"
  }
  $.ajax({
    type: "GET",
    url: url
  })
}

var getCategories = function(){
  $.ajax({
    type: "GET",
    url: "/api/categories/top"
  }).then(function(result){
    renderCategories(result)
  })
}

var renderCategories = function(result){
  $('#catContainer').empty();
  result.forEach(function(element){
    var col = $('<div class="col-lg-2 col-sm-6 mt-2 text-center">');
    col.html('<button type="button" class="btn btn-circle btn-outline btn-dark categoryBtn">' + element.category + '</button>');
    $('#catContainer').append(col)
  })
}

var uploadFunction = function () {
  var title = $("#fileTitle").val().trim()
  var description = $("#fileDesc").val().trim()
  var category = $("#fileCat").val().trim()
  var file = $('#inputFile')[0].files[0]
  
  var form = new FormData();

  form.append("title", title);
  form.append("description", description);
  form.append("category", category);
  form.append("userFile", file);


  $("#btnSubmit").prop("disabled", true);

  $.ajax({
      type: "POST",
      enctype: 'multipart/form-data',
      url: "/api/upload",
      data: form,
      processData: false,
      contentType: false,
      cache: false,
      timeout: 600000,
      success: function(result) {
        if(result.status == 200){
          $('#uploadModal').modal('hide')
          
        }
        else{
            console.log("Error")
        }
    }
  }).then(resetUploadForm());
}

var categorySearch = function(category){
  var url = "pins/" + category
  window.location.href = "/" + url
}

var resetUploadForm = function(){
  $("#btnSubmit").prop("disabled", false)
  $("#fileTitle").val('');
  $("#fileDesc").val('');
  $("#fileCat").val('');
  $('#inputFile').val('');
}

var initializeMasonry = function(){
  var $grid = $(".grid").imagesLoaded(function () {
    // init Masonry after all images have loaded
    $grid.masonry({
      // options
      itemSelector: ".grid-item",
      fitWidth: true,
      gutter: 10,
      transitionDuration: "0.8s",
      //percentPosition: true,
    });
  });
}

loginCheck();
getCategories();
initializeMasonry();

});
