
function display(data){
    $("#studioTitle").text(data["title"]);

    
    $.each(data["type"], function (index, t) {
        let t1 = new $("<div class='row typeItem'> <a href=/search/" + t +">" + t + "</div>");
        $("#typeList").append(t1);
    });
    let price = new $("<span> &nbsp $" + data["price"] + "</span>");
    $("#price").append(price);

    
    $.each(data["locations"], function (index, l) {
        let l1 = new $("<div class='row locationItem'> <a href=/search/" + l +">" + l + "</div>");
        $("#locationList").append(l1);
    });

    let video = new $("<iframe class=iframe src=" + data["media"] + " alt=" + data["alt"] + "> </iframe>");
    $("#media").append(video);
    $("#summary").text(data["summary"]);

    let str = "";
    $.each(data["classes"], function (index, classType){
        if(index == data["classes"].length-1)
            str += classType
        else
            str += (classType + ", ")
    });
    let item = new $("<div id=typeList> <b> Classes: &nbsp </b>" + str + "</div>");
    $("#classes").append(item);
}




$(document).ready(function(){
    display(data)  
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
    $("#new").click(function (event){
        event.preventDefault();
        url = "/add";
        window.location.assign(url);
    });
    $("#editButton").click(function (event){
        event.preventDefault();
        let id = data["id"];
        url = "/edit/" + id
        window.location.assign(url);
    });

})