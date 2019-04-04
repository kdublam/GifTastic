// Initial array of topics
var topics = ["Ronaldo", "Messi", "Neymar", "Zlatan"];

// Function for dumping the JSON content for each button into the div
function displayGif() {
    $("#instruct").text("Click on the gifs to animate them!")
    var athlete = $(this).attr("data-name");
    console.log(athlete);
    $("#gif-space").empty();
    var queryURL = "http://api.giphy.com/v1/gifs/search?api_key=MtF2EsI3nTA6HfTPSUbOkUC4i0LBGHwb&limit=10&q=" + athlete;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var results = response.data;

        for (i = 0; i < results.length; i++) {
            var topicDiv = $("<div>");

            // Under every gif, display its rating (PG, G, so on).
            var p = $("<p>");
            p.text(results[i].rating);
            var p = $("<p>").text("Rating: " + results[i].rating);

            // Image tag for the gifs
            var topicImage = $("<img>")

            // add states of animate and still which will be toggled 
            topicImage.attr("src", results[i].images.fixed_height_still.url);
            topicImage.attr("data-still", results[i].images.fixed_height_still.url);
            topicImage.attr("data-animate", results[i].images.fixed_height.url)
            topicImage.attr("data-state", "still")
            topicImage.addClass("gif");

            // var ImageDownload = $("<button>")
            
            // ImageDownload.addClass("btn");
            // ImageDownload.attr("src", results[i].images.fixed_height.url);
            // ImageDownload.attr("download", "new.gif");
            // ImageDownload.append("Download");

            // image is appended to the div
            topicDiv.append(topicImage);
            // rating is appended to the div below the gif
            topicDiv.append(p);

            // topicDiv.append(ImageDownload);
            // new images will be placed at the beginning (top) of the containing gif area
            $("#gif-space").prepend(topicDiv);
        }
        //   $("#athlete-view").html(JSON.stringify(response));
        //   var athleteImg = $("<img>");
        //   athleteImg.attr("src", response.Poster);
        //   $("#athlete-poster").append(athleteImg);

    });

}

// Function for displaying athlete data
function renderButtons() {

    // Deleting the buttons prior to adding new topics
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of topics
    for (var i = 0; i < topics.length; i++) {

        // Then dynamicaly generating buttons for each athlete in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class of athlete to our button
        a.addClass("athlete btn btn-success");
        // Adding a data-attribute
        a.attr("data-name", topics[i]);
        // Providing the initial button text
        a.text(topics[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(a);
    }
}

$("#gif-space").on("click", ".gif", function(event){
	event.preventDefault();
	
	// gets the current state of the clicked gif 
	var state = $(this).attr("data-state");
	
	// according to the current state gifs toggle between animate and still 
	if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }

})

// This function handles events where one button is clicked
$("#add-athlete").on("click", function (event) {
    event.preventDefault();

    // This line grabs the input from the textbox
    var athlete = $("#athlete-input").val().trim();

    // The athlete from the textbox is then added to our array
    topics.push(athlete);

    // Calling renderButtons which handles the processing of our athlete array
    renderButtons();

});

// Generic function for displaying the athleteInfo
$(document).on("click", ".athlete", displayGif);

// Calling the renderButtons function to display the intial buttons
renderButtons();