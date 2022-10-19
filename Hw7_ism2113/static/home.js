function displayHome(data) {
    $("#updates").empty();
    $.each(data, function (index, workout){
  
      let item = new $("<div class='col popular'> <iframe class=media height=300 src=" + workout.media+ " alt="+ workout.alt +" > </iframe> </div>");
      $("#updates").append(item);
      let name = new $("<div class=link> <div class=name> " + workout.title + "</div></div>")
      $(name).click(function (event){
        url = "/data/" + workout.id;
        window.location.assign(url);
    });
      $(item.append(name))
    });
}


  $(document).ready(function(){   
    displayHome(data)        
    $("#target").submit(function (event){
        event.preventDefault();
        if (!/\S/.test($("#search").val()) == true){
            $("#search").val("");
            $("#search").focus();
        }
        else{
            console.log($("#search").val());
            url = "/search/" + $("#search").val().toLowerCase();
            console.log(url);
            window.location.assign(url);
        }
    });
    $("#search").keypress(function (event){
        if(event.which == 13){
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
    /*$(".popular").forEach(click(function() {
        window.location.assign((this).find("a").attr("href")); 
        return false;
      });*/
})