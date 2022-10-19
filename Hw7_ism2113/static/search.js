function displayHome(title_data, type_data, location_data, search) {
    $(".updates").empty()
    if (title_data.length == 0 && type_data.length == 0 && location_data.length == 0){
        $("#resultsNum").text("No results found.")
    }
    let regEx = new RegExp(search, "ig");
    if (title_data.length > 0){
        $.each(title_data, function (index, workout){
            matches = workout.title.match(regEx);
            console.log(matches);
            $.each(matches, function (index, element){
                stringrep = '<b>'+element+'</b>';
                workout.title = workout.title.replace(element, stringrep);
            });
            //newTitle = workout.title.replace(regEx, stringrep);
            console.log('workout', workout);
            let item = new $("<div class='row item'> <a href=/data/" + workout.id +">" + workout.title + "</div>");
            $("#studioUpdates").append(item);
        });
    }
    if (type_data.length > 0){
        $.each(type_data, function (index, workout){
            let str = " (";
            $.each(workout.type, function (index, type){
                //newType = type.replace(regEx, stringrep);
                matches = type.match(regEx);
                $.each(matches, function (index, element){
                    stringrep = '<b>'+element+'</b>';
                    type = type.replace(element, stringrep);
                });
                if(index == workout.type.length-1)
                    str += type
                else
                    str += (type + ", ")
            });
            str += ")";
            let item = new $("<div class='row item'> <a href=/data/" + workout.id +"> <span class=light>" + workout.title + "</span><br> Type:" + str + "</div>");
            $("#typeUpdates").append(item);
        });
    }
    if (location_data.length > 0){
        $.each(location_data, function (index, workout){
            let str = " (";
            $.each(workout.locations, function (index, location){
                //newType = type.replace(regEx, stringrep);
                matches = location.match(regEx);
                $.each(matches, function (index, element){
                    stringrep = '<b>'+element+'</b>';
                    location = location.replace(element, stringrep);
                });
                if(index == workout.locations.length-1)
                    str += location
                else
                    str += (location + ", ")
            });
            str += ")";
            let item = new $("<div class='row item'> <a href=/data/" + workout.id +"> <span class=light>" + workout.title + "</span><br> Locations:" + str + "</div>");
            $("#locationUpdates").append(item);
        });
    }
}

function displaySearchTerm(search, title_data, type_data, location_data){
    $("#mainLabel").empty();
    let length = title_data.length + type_data.length + location_data.length 
    let title = $("<div id=home> Searched for: " + search + "</div>");
    let num = $( "<div id=num> Number of Results: &nbsp" + length + "</div>");
    $("#mainLabel").append(title);
    $("#mainLabel").append(num);
    $("#studio").text("");
    $("#type").text("");
    $("#location").text("");

    if (title_data.length > 0){
        $("#studio").text("Names of Workout Studios:")
    }
    if (type_data.length > 0){
        $("#type").text("Types of Workouts:");
    }
    if (location_data.length > 0){
        $("#location").text("Studio Locations:");
    }
}

$(document).ready(function(){
    displaySearchTerm(search, title_data, type_data, location_data);
    displayHome(title_data, type_data, location_data, search);
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
})