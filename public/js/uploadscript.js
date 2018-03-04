

$(document).ready(function() {
var loggedIn;

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

loginCheck();
console.log(loggedIn)

var loginToggle = function(state){
  if (state){
    $("#nav-login").text("Logout").attr("href", "/logout")
  } else {
    $("#nav-login").text("Login")
  }
}

var boardToggle = function(state){
  if (!state){
    $("#nav-board").attr("href", "#")
  }
}

//Upload button click handler
$("#nav-upload").on("click", function(){
  if (loggedIn){
    $('#uploadModal').modal('show')
  } else {
    $('#loginModal').modal('show')
  }

})

$("#nav-board").on("click", function(){
if (!loggedIn){
  $('#loginModal').modal('show')
}
  
//   $.getJSON("api/user_data", function(data) {
//     console.log("response: " + data)
//     // Make sure the data contains the username as expected before using it
//     if (data.hasOwnProperty('userid')) {
//         getBoards(data.userid);
//     }
// });
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

$(".boardBtn").on("click", function(){
  var category = encodeURI($(this).attr("id"))
  var path = window.location.pathname
  window.location.href = path + category
})

//Category button click handler
$(".categoryBtn").on("click", function(event){
  event.preventDefault();
  var category = $(this).text()
  categorySearch(category);
  })



//Pin click handler
$(".pinBtn").on("click", function (event){
if (loggedIn){
  var pinId = $(this).attr("id")

  $('#boardModal').modal('show')

  $("#boardSubmit").on("click", function(){
    var category;
  
    console.log($('#newBoardInput').val())

    if($('#newBoardInput').val()){
      category = $('#newBoardInput').val()
    }
    else {
      category = $("#userCategory").find(":selected").text();
    }

    console.log("Id " + pinId)
    console.log("Category " + category)
  
    var postObj = {
      category: category,
      pinId: pinId
    }

    $.ajax({
      type: "POST",
      data: postObj,
      url: "/api/boards",
      success: function(result) {
        if(result.status == 200){
          $('#boardModal').modal('hide')
        }
        else{
            console.log("Error")
        }
    }
    }).then(function(result){
      console.log(result)
    })

  })
  } else {
    $('#loginModal').modal('show')  
  }
});


//Functions//
//-----------------------------------//

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
  }).then(function(result){
    console.log(result)
  })
}

var uploadFunction = function () {
  var title = $("#fileTitle").val().trim()
  var description = $("#fileDesc").val().trim()
  var category = $("#fileCat").val().trim()
  var file = $('#inputFile')[0].files[0]
  
  var form = new FormData();

  console.log(title)
  console.log(description)
  console.log(category)
  console.log(file)

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
  });
}

var categorySearch = function(category){
  var url = "api/pins/" + category
  $.ajax({
    type: "GET",
    url: url
  }).then(function(result){
    console.log(result)
  });
}
    



});
