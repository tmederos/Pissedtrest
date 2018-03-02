$(document).ready(function() {


//Opens modal
$("#nav-upload").on("click", function(){
  $('#uploadModal').modal('show')
})


$("#btnSubmit").click(function (event) {

  event.preventDefault();
  uploadFunction();

})

var uploadFunction = function () {

  var form = $('#fileUploadForm')[0];

  var data = new FormData(form);

  $("#btnSubmit").prop("disabled", true);

  $.ajax({
      type: "POST",
      enctype: 'multipart/form-data',
      url: "/api/upload",
      data: data,
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
    
});
