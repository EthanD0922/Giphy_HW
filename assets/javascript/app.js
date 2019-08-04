var apiKey = "D3gyKQZgSDL2qnnsn3Lnhuc5XdYNUwpi";

var userSearch = "";



function infoGet(){
    $("#gifs").empty()

    var giphyAPI = "https://api.giphy.com/v1/gifs/search?q=" +
    userSearch + "&api_key=" + apiKey;

$.ajax({
    url: giphyAPI,
    method: "GET",
}).then(function(response) {
    var results = response.data
    for (var i = 0; i < results.length; i++){
        var newDiv = $("<div>")
        
        var selectGif = $("<img src='" + results[i].images.fixed_width_still.url + "'>")
        
        selectGif.attr("data-still", results[i].images.fixed_width_still.url)
        selectGif.attr("data-animate", results[i].images.fixed_width.url) 
        selectGif.attr("data-state", "still")
        selectGif.attr("class", "gif col justify-content-center")
        
        var selectRating = $("<p class='text-center'>Rating: " + results[i].rating + "</p>")

        newDiv.prepend(selectGif).prepend(selectRating)

        $("#gifs").prepend(newDiv)
    }
console.log(userSearch)
console.log(response)
})}

$(document).on("click", ".gifButton", function(){
    userSearch = $(this).text()
    console.log("works " + userSearch)
    infoGet()
})


$(document).on("click", ".gif", function() {

    var state = $(this).attr("data-state");
    
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
    console.log("works " + state)
  });

$(document).on("click", "#submit-catagory", function(event){
    event.preventDefault();

    var newButton = $("<button>")

    newButton.attr("class", "dropdown-item gifButton")

    var newTopicText = $("#new-catagory").val().trim()

    newButton.text(newTopicText)

    $("#newTopics").prepend(newButton)

    console.log()


})