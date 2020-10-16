
// create a variable 'q' for query search and 'i' for ingredients

// create event when search button is clicked
$("#find-recipe").click(function(event) {
    event.preventDefault();
    // retrieve input from textarea
    var textAreaEl = $(".query-search").val().trim();
    console.log(textAreaEl);
    console.log("button was clicked");

    // concat input into fetch request to return data

})

// remove endpoints and modify fetch request to concat strings based on modal input
fetch("https://rapidapi.p.rapidapi.com/?p=1&i=onions%2Cgarlic&q=omelet", {
    "method": "GET",
    "headers": {
        "x-rapidapi-host": "recipe-puppy.p.rapidapi.com",
        "x-rapidapi-key": "358cb2fa9amshbe93bf171c704afp1d857cjsn9e3fac832eff"
    }
})
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    });

// Modal Functions 

// Add to list button


