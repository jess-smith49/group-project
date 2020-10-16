// function when search button is clicked
$("#find-drink").click(function(event) {
    event.preventDefault();
    // retrieve input from textarea
    var textAreaEl = $(".drink-search").val().trim();
    console.log(textAreaEl);
    console.log("button was clicked");
})

fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
    });

    
