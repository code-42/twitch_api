$(document).ready(function(){
    // $("#search").on("click", function() {
        // var searchTerm = $("#searchTerm").val();
        var following = [];
        // it should display if the streamer is currently streaming
        var streamUrl = "https://api.twitch.tv/kraken/streams/freecodecamp?client_id=i8bs8r4qbwx5i32va97ejxoi7euk16";
        console.log("7.streamUrl == " + streamUrl);
        $.getJSON(streamUrl, function(data){
            console.log("8.data.stream == " + data.stream);
            if (data.stream === null){
                console.log("10.fcc is currently offline");
            } else {
                console.log("12.fcc is currently online");
            }
        });

        var urlArray = [
            "https://api.twitch.tv/kraken/channels/twitch",
            "https://api.twitch.tv/kraken/streams/freecodecamp",
            "https://api.twitch.tv/kraken/chat/twitch",
            "https://api.twitch.tv/kraken/chat/twitch/badges",
            "https://api.twitch.tv/kraken/chat/twitch/emoticons",
            "https://api.twitch.tv/kraken/channels/twitch/commercial",
            "https://api.twitch.tv/kraken/channels/twitch/editors",
            "https://api.twitch.tv/kraken/channels/twitch/features",
            "https://api.twitch.tv/kraken/channels/twitch/follows",
            "https://api.twitch.tv/kraken/users/freecodecamp/follows/channels",
            "https://api.twitch.tv/kraken/users/mrbuttss",
            "https://api.twitch.tv/kraken/users/feather_eagle",
            "https://api.twitch.tv/kraken/channels/twitch/stream_key",
            "https://api.twitch.tv/kraken/channels/twitch/subscriptions",
            "https://api.twitch.tv/kraken/channels/twitch/teams",
            "https://api.twitch.tv/kraken/channels/twitch/videos"
            ]

    $.each(urlArray, function(i, url){
        $.ajax({
            type: "GET",
            url: url,
            contentType: "application/json; charset=utf-8",
            async: false,
            dataType: "json",
            headers: {
                'Client-ID': 'i8bs8r4qbwx5i32va97ejxoi7euk16'
            },
            success: function (data) {
                console.log("57.url == ");
                console.log(url);
                console.log("59.data == ");
                console.log(data);
                // var html = "<ul class='list-group'>"
                // for(var i=0; i < data[1].length; i++){
                //     html += 
                //     "<li class='list-group-item'>" +
                //     "<a href='" + data[3][i] + "' target='_blank' class='title'>" + data[1][i] + "</a>" +
                //     "<p>" + data[2][i] + "</p>" +
                //     "</li>"
                }
                // html += "</ul>";
                // $("#search_results").html(html);
            // }
        });
    });
        
        var followerUrl = "https://api.twitch.tv/kraken/users/freecodecamp/follows/channels?client_id=i8bs8r4qbwx5i32va97ejxoi7euk16";
        $.getJSON(followerUrl, function(data2){
            console.log("77.data2 == " + data2);
            for(var i = 0; i < data2.follows.length; i++){
                var displayName = data2.follows[i].channel.display_name;
                console.log("80.displayName == " + displayName);
                following.push(displayName);
            }
            following.push('comster404');
            following.push('brunofin');
            following.push('other');
            console.log("86.following == " + following);
            
            console.log("88.following.length == " + following.length);
            for (var i=0; i<following.length; i++){
                var url2 = "https://api.twitch.tv/kraken/streams/" + following[i] + "/?callback=?";
                console.log("91.url2 == " + url2);
            
            // for(var i = 0; i < data2.follows.length; i++){
            //     var logo = data2.follows[i].channel.logo;
            //     console.log("96.logo == " + logo);
            // }
            
                $.getJSON(url2).done(function(data3){
                    console.log("93.data3 == " + data3);
                    var logo;
                    var status;
                    var name;
                    if(data3.error){
                        console.log("96.url2 == " + url2);
                        name = data3.message;
                        status = data3.error;
                        console.log("99.name == " + name);
                        console.log("99.status == " + status);
                    }
                })
            }
        });
}); 
