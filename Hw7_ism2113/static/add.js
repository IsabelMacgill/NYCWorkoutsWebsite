function save_entry() {
    let data_to_save = {
      title: $("#titleIn").val(),
      type: $("#typeIn").val(),
      media: $("#mediaIn").val(),
      alt: "Cover Video or Website Link",
      summary: $("#summaryIn").val(),
      locations: $("#locationsIn").val(),
      classes:  $("#classesIn").val(),
      price: $("#priceIn").val(),
    };
    console.log(data_to_save)
    $.ajax({
      type: "POST",
      url: "save_entry",
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(data_to_save),
      success: function (result) {
        showUpdate(result["data"], result["id"])
      },
      error: function (request, status, error) {
        console.log("Error");
        console.log(request);
        console.log(status);
        console.log(error);
      },
    });
}

function showUpdate(data, id){
    $("#added").empty();
    let str = new $("<div class='viewpage'> New item successfully created. </div>")
    let link = new $("<div class='viewpage'> See it &nbsp<a href=/data/" + data[id].id +"> here. </div>");
    $("#added").append(str);
    $("#added").append(link);
    $("#titleIn").focus();
}

function checks() {
    if (
      $("#titleIn").val().length > 0 &&  !/\S/.test($("#titleIn").val()) == false &&
      $("#classesIn").val().length > 0 && !/\S/.test($("#classesIn").val()) == false &&
      $("#locationsIn").val().length > 0 && !/\S/.test($("#locationsIn").val()) == false &&
      $("#priceIn").val().length > 0 && /^-?\d+$/.test($("#priceIn").val()) == true &&
      $("#mediaIn").val().length > 0 && !/\S/.test($("#mediaIn").val()) == false &&
      $("#summaryIn").val().length > 0 && !/\S/.test($("#summaryIn").val()) == false
    ) {
      return true;
    }
    return false;
}

function warnings() {
    let warning = new $("<div>");
    warning.addClass("alert alert-danger");
    if ($("#titleIn").val().length <= 0 || !/\S/.test($("#titleIn").val()) == true){
        $("#titleIn").focus();
        warning.text("Warning: Enter Text");
        $("#titleForm").append(warning);
    } 
    else if ($("#typeIn").val().length <= 0 || !/\S/.test($("#typeIn").val()) == true){
        $("#typeIn").focus();
        warning.text("Warning: Enter Text");
        $("#typeForm").append(warning);
    }
    else if ($("#classesIn").val().length <= 0 || !/\S/.test($("#classesIn").val()) == true){
        $("#classesIn").focus();
        warning.text("Warning: Enter Text");
        $("#classesForm").append(warning);
    }
    else if ($("#locationsIn").val().length <= 0 || !/\S/.test($("#locationsIn").val()) == true){
        $("#locationsIn").focus();
        warning.text("Warning: Enter Text");
        $("#locationsForm").append(warning);
    }
    else if ($("#priceIn").val().length <= 0 || /^-?\d+$/.test($("#priceIn").val()) == false){
        warning.text("Warning: Enter Number");
        $("#priceForm").append(warning);
        $("#priceIn").focus();
    }
    else if ($("#mediaIn").val().length <= 0 || !/\S/.test($("#mediaIn").val()) == true){
        $("#mediaIn").focus();
        warning.text("Warning: Enter Text");
        $("#mediaForm").append(warning);
    }
    else if ($("#summaryIn").val().length <= 0 || !/\S/.test($("#summaryIn").val()) == true){
        $("#summaryIn").focus();
        warning.text("Warning: Enter Text");
        $("#summaryForm").append(warning);
    }
  }
  
  function createOrWarn() {
    $(".alert").remove();
    if (!checks()){
        warnings();
    }
    else {
      save_entry();
      $(".alert").remove();
      $(".form-control").val("");
    }
  }

$(document).ready(function(){       
    $("#add").submit(function (event){
        event.preventDefault();
        createOrWarn();
    });

    $("#target").submit(function (event){
      event.preventDefault();
      if (!/\S/.test($("#search").val()) == true){
          $("#search").val("");
          $("#search").focus();
      }
      else{
          console.log($("#search").val());
          url = "/search/" + $("#search").val();
          window.location.assign(url);
      }
  });
  $("#search").keypress(function (event){
      if(evenet.which == 13){
          event.preventDefault();
          if (!/\S/.test($("#search").val()) == true){
              $("#search").val("");
              $("#search").focus();
          }
              else{
              console.log($("#search").val());
              url = "/search/" + $("#search").val();
              window.location.assign(url);
          }
      }
  });
});