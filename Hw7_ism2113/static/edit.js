function prefill(data){
    $("#titleIn").val(data["title"]);
    $("#typeIn").val(data["type"]);
    $("#mediaIn").val(data["media"]);
    $("#summaryIn").val(data["summary"]);
    $("#locationsIn").val(data["locations"]);
    $("#classesIn").val(data["classes"]);
    $("#priceIn").val(data["price"]);
}



function edit_entry(id, data) {
    let data_to_save = {
        id: id,
        title: $("#titleIn").val(),
        type: $("#typeIn").val(),
        media: $("#mediaIn").val(),
        alt: "Cover Video or Website Link",
        summary: $("#summaryIn").val(),
        locations: $("#locationsIn").val(),
        classes:  $("#classesIn").val(),
        price: $("#priceIn").val(),
    };
    $.ajax({
      type: "POST",
      url: "edit_entry",
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(data_to_save),
      success: function (result) {
        let url = "/data/" + result['id'];
        console.log(url);
        window.location.assign(url);
      },
      error: function (request, status, error) {
        console.log("Error");
        console.log(request);
        console.log(status);
        console.log(error);
      },
    });
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
        $("#priceIn").focus();
        warning.text("Warning: Enter Number");
        $("#priceForm").append(warning);
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
  
  function editOrWarn(id) {
    $(".alert").remove();
    if (!checks()){
        warnings();
    }
    else {
      edit_entry(id);
    }
  }

$(document).ready(function(){
    prefill(data)       
    $("#add").submit(function (event){
        event.preventDefault();
        editOrWarn(id, data);
    });
    $("#discard").click(function (event){
        event.preventDefault();
        if (confirm("Are you sure you want to discard changes? Press 'OK' to discard changes and 'Cancel' to continue editing. ")){
            let url = "/data/" + id;
            window.location.assign(url);
        }
    });
});