var client_id = "i8bs8r4qbwx5i32va97ejxoi7euk16";

// var followers = ["iKasperr", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

$(function() {
    var followers = ["iKasperr", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

    // $.getJSON('https://api.twitch.tv/kraken/users/freecodecamp?client_id=i8bs8r4qbwx5i32va97ejxoi7euk16').done(function(users) {
    //     console.log('users == ', users);
    // });

    // $.getJSON('https://api.twitch.tv/kraken/streams/freecodecamp?client_id=i8bs8r4qbwx5i32va97ejxoi7euk16').done(function(streams) {
    //     // console.log(streams);
    //     if (streams.stream === null) {
    //         $("#fcc").html(' is offline');
    //     } else {
    //         $("#fcc").html(' is ONLINE!');
    //     }
    // });

    var html = "<ul class='list-group' id='ul-list-group'>";

    for (var i = 0; i < followers.length; i++) {
        $.ajax({
            type: 'GET',
            // url: 'https://api.twitch.tv/kraken/streams/' + streams[i],
            url: 'https://api.twitch.tv/kraken/channels/' + followers[i],
            headers: {
                'client-ID': 'i8bs8r4qbwx5i32va97ejxoi7euk16'
            },
            success: function(channels) {
                console.log('channels == ', channels);
                $.getJSON('https://api.twitch.tv/kraken/streams/' + channels.name + '?client_id=i8bs8r4qbwx5i32va97ejxoi7euk16')
                    .done(function(streams) {

                        var name = streams._links.self.slice(37);
                        console.log('name == ', name);

                        var html = '';
                        if (streams.stream === null) {
                            html +=
                                "<li class='list-group-item'>" +
                                // "<span class='headline-img'><img src='" + article.urlToImage + "'></span>" +
                                "<a href=http://www.twitch.tv/'" + name + "' target='_blank' class='title'>" + name + "</a>" +
                                "<span class='articleDescription'> is offline </span>" +
                                // "<span class='articlePublishedAt'>not online</span>" +
                                "</li>";
                        } else {
                            html +=
                                "<li class='list-group-item'>" +
                                // "<span class='headline-img'><img src='" + article.urlToImage + "'></span>" +
                                "<a href=http://www.twitch.tv/'" + name + "' target='_blank' class='title'>" + name + "</a>" +
                                "<span class='articleDescription'> is ONLINE! playing </span>" +
                                "<span class='articlePublishedAt'>" + streams.stream.game + "</span>" +
                                "</li>";
                        }
                        console.log("html2 == ", html)
                        $("#ul-list-group").append(html);
                    });
            },
            error: function(err) {
                alert("Error: User not found");
            }
        })
    };
    html += "</ul>";
    console.log("html == ", html);
    $("#twitchers").html(html);
});