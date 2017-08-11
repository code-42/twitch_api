// NOTE: from #9 on freeCodeCamp  Use the Twitchtv JSON API 
// https://www.freecodecamp.org/challenges/use-the-twitchtv-json-api
// 9. UPDATE: Due to a change... 
// they point to this page but users comments steered me away
// see --> https://gist.github.com/QuincyLarson/2ff6892f948d0b7118a99264fd9c1ce8


$(function() {
    var streamers = ["iKasperr", "ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "sickmotionlol", "userrerr", "nonexistingstreamer"];

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
                        var html = '';
                        if (streams.stream === null) {
                            html +=
                                "<li class='list-group-item'>" +
                                "<img class='logo' src='" + logo + "'>" +
                                "<a href=http://www.twitch.tv/'" + display_name + "' target='_blank' class='title'>" +
                                "<span class='namer'>" + display_name + "</span></a>" +
                                "<span class='status'>  is offline </span>" +
                                "</li>";
                        } else {
                            html +=
                                "<li class='list-group-item'>" +
                                "<span><img class='logo' src='" + logo + "'>" +
                                "<a href=http://www.twitch.tv/'" + display_name + "' target='_blank' class='title'>" +
                                "<span class='namer'>" + display_name + "</span></a>" +
                                "<span class='status'>  is ONLINE! playing </span>" +
                                "<span class='game'>" + streams.stream.game + "</span>" +
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
                    "<li class='list-group-item'>" +
                    "<img class='logo' src='http://www.malaysiaproclub.com/wp-content/uploads/2016/07/twitch.png'>" +
                    "<span class='namer'>" + streamer + "</span> is no longer an active account or does not exist" +
                    "</li>";

                $("#ul-list-group").append(html);
            }
        })
    };
    html += "</ul>";
    $("#twitchers").html(html);
});