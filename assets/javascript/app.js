//My api key used to get the info from giphy
var apiKey = "D3gyKQZgSDL2qnnsn3Lnhuc5XdYNUwpi";

//used later on in infoGet() to define the serch criteria 
var userSearch = "";

//will be used to shorten the response.data when its needed.
var results = ""

var selectRating = ""

// var newDiv = ""

var selectGif = ""

//the core function that runs the text in the button selected from the dropdowns and runs
//the giphy api.
function infoGet(){
    $("#gifs").empty()
    var giphyAPI = "https://api.giphy.com/v1/gifs/search?q=" +
    userSearch + "&api_key=" + apiKey;

$.ajax({
    url: giphyAPI,
    method: "GET",
}).then(function(response) {
    results = response.data
    

    //this for loop adds 10 gifs to the screen at a paused state.
    for (var i = 0; i < 10; i++){
        renderGifs(results[i])

        //add the red <3 button so that the user can save specific gifs under the favorite tab
        var favoriteBtn = $("<button class='btn btn-danger m-2 favoriteBtn' value='" + results[i].id + "' data-title='" + results[i].title + "'type='submit'><3</button>")

        //following sends the above information to the #gifs div
        selectRating.append(favoriteBtn)

    }
console.log(userSearch)
console.log(response)
})}


//this runs the above information with the text of the dropdown item selected.
$(document).on("click", ".gifButton", function(){
    userSearch = $(this).text()
    infoGet()
})

// The pause/play on click for the gifs themselves
$(document).on("click", ".gif", function() {

    var state = $(this).attr("data-state");
    
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

//When a new catagory is added with the submit button this adds the text to the new tab
$(document).on("click", "#submit-catagory", function(event){
    event.preventDefault();

    var newButton = $("<button>")

    newButton.attr("class", "dropdown-item gifButton")

    var newTopicText = $("#new-catagory").val().trim()

    newButton.text(newTopicText)

    $("#newTopics").prepend(newButton)

    $("#new-catagory").val(" ")
})


//this is the on click for when an favorite button is clicked above a picture, it adds the 
// gif to the favorites tab
$(document).on("click", ".favoriteBtn", function(event){
    event.preventDefault();

    var favBtn = $("<button>");

    favBtn.attr("class" , "dropdown-item newFavorite")
    favBtn.attr("value", $(this).val())

    var favoriteText = $(this).attr("data-title")

    favBtn.text(favoriteText)

    $("#favorites").prepend(favBtn)
})


//This is the on click that runs when a button under the favorites tab is clicked
$(document).on("click", ".newFavorite", function(){
    $("#gifs").empty()

    //this ajax pull is different fronm the infoGet() ajax because this one is pulling info
    //about a specific gif (the one the user saved) by using the gifs ID in the api
    var faveAPI = "https://api.giphy.com/v1/gifs/" + $(this).val() + "?api_key=" + apiKey;

    $.ajax({
        url: faveAPI,
        method: "GET",
    }).then(function(response){
        results= response.data
        renderGifs(results);
    })
});

function renderGifs(data) {
    var newDiv = $("<div>")

    newDiv.attr("class", "border rounded ml-1 mt-2")

    //The img loads as still
    var selectGif = $("<img src='" + data.images.fixed_width_still.url + "'>")
    //The following 4 lines set data so that the gif is able to be switched between still
    //and animated
    selectGif.attr("data-still", data.images.fixed_width_still.url)
    selectGif.attr("data-animate", data.images.fixed_width.url) 
    selectGif.attr("data-state", "still")
    selectGif.attr("class", "gif col justify-content-center")
    
    //used to pull the rating from the select gif
    selectRating = $("<p class='text-center'>Rating: " + data.rating + "</p>")

    newDiv.prepend(selectGif).prepend(selectRating)

    $("#gifs").prepend(newDiv)

}