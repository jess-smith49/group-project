
<<<<<<< HEAD
//SEARCH FUNCTION
$("#find-recipe").click(function(event){
    console.log("clicked");

    event.preventDefault();

    //getting text from query input
    var recipeNameEl = $("#query-search").val().trim();

    //fetch by meal aname, DELIMIMED BY A COMMA!!!
    fetch("https://api.spoonacular.com/recipes/complexSearch?apiKey=5e85b9e168244c1cbbe7ed190aca128b&query=" + recipeNameEl)
        .then(function(response){
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            displayRecipeList();
        })
        


    //clear content out after search
    $("#query-search").val("");
});

function displayRecipeList(){
    for (var i = 0; i < 11; i++){
        let recipeSection = $("#recipe-results");
        let recipeName = $("<li>")
        let recipeImg = $("<img>")
        let recipeIns = $("<p>")
    }
}

















