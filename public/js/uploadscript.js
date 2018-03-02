$(document).ready(function() {

//Upload button click handler
$("#nav-upload").on("click", function(){
  $('#uploadModal').modal('show')
})

//Submit button click handler
$("#btnSubmit").on("click", function (event) {
  event.preventDefault();
  uploadFunction();
})

//Search Button click handler
$("#searchBtn").on("click", function(event){
  event.preventDefault();
  var category = $("#category-search").val().trim();
  categorySearch(category);

})

//Category button click handler
$(".categoryBtn").on("click", function(event){
  event.preventDefault();
  var category = $(this).text()
  categorySearch(category);
})

//Pin click handler
$(".pinBtn").on("click", function (event){
  var id = $(this).attr("id")
  var url = "api/pin/" + id
  console.log(url)
  $.ajax({
    type: "PUT",
    url: url
  }).then(function(result){
    console.log(result)
  })
})

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
