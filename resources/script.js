// NOTE: from #9 on freeCodeCamp  Use the Twitchtv JSON API 
// https://www.freecodecamp.org/challenges/use-the-twitchtv-json-api
// 9. UPDATE: Due to a change... 
// they point to this page but users comments steered me away
// see --> https://gist.github.com/QuincyLarson/2ff6892f948d0b7118a99264fd9c1ce8

var streamers = ["iKasperr", "ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "sickmotionlol", "userrerr", "nonexistingstreamer"];

    
$(function() {
    
    function loadMe(){
        
// Add a text field that will add another streamer to the list.
        var html = "<ul class='list-group' id='ul-list-group'>";
    
        for (var i = 0; i < streamers.length; i++) {
            var streamer = streamers[i];
            $.ajax({
                type: 'GET',
                url: 'https://api.twitch.tv/kraken/channels/' + streamers[i],
                headers: {
                    'client-ID': client_id
                },
                success: function(channels) {
                    $.getJSON('https://api.twitch.tv/kraken/streams/' + channels.name + '?client_id=' + client_id + '&callback=?')
                        .done(function(streams) {
                            var display_name = channels.display_name;
                            var logo = channels.logo;
                            var followers = channels.followers;
                            var html = '';
                            if (streams.stream === null) {
                                console.log("followers: ", followers);
                                console.log("offline == ", display_name);
                                html +=
                                    "<li class='list-group-item offline'>" +
                                    "<img class='logo' src='" + logo + "'>" +
                                    "<a href=https://www.twitch.tv/'" + display_name + "' target='_blank' class='title'>" +
                                    "<span class='namer'>" + display_name + "</span></a>" +
                                    "<span class='status'>  is offline </span>" +
                                    "<span class='status'>  and has <span class='namer'>" + followers + "</span> followers.</span>" +
                                    "</li>";
                            } else {
                                console.log("followers: ", followers);
                                console.log("online == ", display_name);
                                html +=
                                    "<li class='list-group-item online'>" +
                                    "<span><img class='logo' src='" + logo + "'>" +
                                    "<a href=https://www.twitch.tv/'" + display_name + "' target='_blank' class='title'>" +
                                    "<span class='namer'>" + display_name + "</span></a>" +
                                    "<span class='status'>  is ONLINE! playing </span>" +
                                    "<span class='namer'>" + streams.stream.game + "</span>" +
                                    "<span class='status'>  and has <span class='namer'>" + followers + "</span> followers.</span>" +
                                    "</li>";
                            }
    
                            $("#ul-list-group").append(html);
                        });
                },
                error: function(url) {
                    var html = '';
                    var streamer = url.responseJSON.message.slice(34);
                    streamer = streamer.substr(0, streamer.length - 1);
    
                    html +=
                        "<li class='list-group-item inactive'>" +
                        "<img class='logo' src='https://www.malaysiaproclub.com/wp-content/uploads/2016/07/twitch.png'>" +
                        "<span class='namer'>" + streamer + "</span> is no longer an active account or does not exist" +
                        "</li>";
    
                    $("#ul-list-group").append(html);
                }
            })
        };
        html += "</ul>";
        $("#twitchers").html(html);
     
    }
    
// this event triggered when a name is entered into the text box
// then calls the function addStreamer()
    $("#addStreamr").change(function(event){
        addStreamer(event);
    });
    
// this event triggered when the Show All button in clicked
// then calls the function showAll()
    $("#btnAll").click(function(event){
        showAll(event);
    });
    
// this event triggered when the Show Online button in clicked
// then calls the function showOnline()
    $("#btnOnline").click(function(event){
        showOnline(event);
    });
        
// this event triggered when the Show Offline button in clicked
// then calls the function showOffline()
    $("#btnOffline").click(function(event){
        showOffline(event);
    });
    
// this try catch block needed so message is displayed
// stating that my API Key is removed from github.com
// for security purposes.
// if the API Key is accessible, this message will not show

    try {    
       loadMe();
    } catch(err) {
        console.log('Error msg: ' + err.message);
        var x = document.getElementById("note");
        x.style.display = 'block';
    }
     
// this function called when a name is entered into the text box  
    function addStreamer(event){
        event.preventDefault();
        var newStreamer = $("#addStreamr").val();
        streamers.push(newStreamer);

// reloads the page so new name is added to streamers array
        loadMe();
        
// make the text input box blank after addStreamer() is called
        $("#addStreamr").val(''); 
    };
    
// this function called when the Show All button in clicked    
    function showAll(event){
        event.preventDefault();
        for (var i = 0; i < streamers.length; i++) {
            if($(".offline").length){
                $(".offline").removeClass("hidden")
            }
            if($(".online").length){
                $(".online").removeClass("hidden")
            }
            if($(".inactive").length){
                $(".inactive").removeClass("hidden")
            }
        }
    }

// this function called when the Show Online button in clicked        
    function showOnline(event){
        event.preventDefault();
        for (var i = 0; i < streamers.length; i++) {
            if($(".offline").length){
                $(".offline").addClass("hidden")
            }
            if($(".online").length){
                $(".online").removeClass("hidden")
            }
            if($(".inactive").length){
                $(".inactive").addClass("hidden")
            }
        }
    }

// this function called when the Show Offline button in clicked        
    function showOffline(event){
        event.preventDefault();
        for (var i = 0; i < streamers.length; i++) {
            if($(".offline").length){
                $(".offline").removeClass("hidden")
            }
            if($(".online").length){
                $(".online").addClass("hidden")
            }
            if($(".inactive").length){
                $(".inactive").addClass("hidden")
            }
        }
    }

});
    



