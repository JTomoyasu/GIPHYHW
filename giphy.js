var topics = ["dogs", "cats", "hamsters", "lions", "dolphins"];
var apiKey = "nU5txiNZGfCgxXVx9bUFZBV3E2BAuLp7";


function getStuff() {
    var topic = $(this).data("name")
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=" + apiKey + "&limit=10";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var results = response.data;
        for (var i = 0; i < results.length; i++) {
            var tempDiv = $("<div>");
            var label = $("<p>");
            label.text("Rating: "+results[i].rating);
            var topicImage = $("<img>");
            topicImage.attr({ "src": results[i].images.fixed_height_still.url , "data-animate": results[i].images.fixed_height.url, "data-still": results[i].images.fixed_height_still.url, "data-state": "still" });
            topicImage.addClass("gif");
            tempDiv.append(topicImage,label);
            $("#gif-area").prepend(tempDiv);
        }
    })
}
function makeButtons() {
    $("#button-area").empty();
    for (var i = 0; i < topics.length; i++) {
        var temp = $("<button>");
        temp.addClass("topic");
        temp.attr("data-name", topics[i]);
        temp.text(topics[i]);
        $("#button-area").append(temp);
    }
}
function gifHandler() {
    var state = $(this).data("state");
    if (state === "still") {
        $(this).data("state", "animate");
        $(this).attr("src", $(this).data("animate"));
    }
    else {
        $(this).data("state", "still");
        $(this).attr("src", $(this).data("still"));
    }
};
$("#add-topic").on("click", function (event) {
    event.preventDefault();
    var topic = $("#topic-input").val().trim();
    if (topic != "") {
        topics.push(topic);
        makeButtons();
    }
});
$(document).on("click", ".topic", getStuff);
$(document).on("click", ".gif", gifHandler);
makeButtons();