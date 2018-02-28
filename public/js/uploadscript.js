$(document).ready(function() {

$("#btnSubmit").click(function (event) {

  event.preventDefault();

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
  });

})
    
});
