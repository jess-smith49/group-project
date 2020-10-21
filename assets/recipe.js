//console.dir(window.document);

//Request and Response-Functioning (example search pasta & max fat)

var recipeNameEl = "recipe-results"

fetch("https://api.spoonacular.com/recipes/complexSearch?apiKey=5e85b9e168244c1cbbe7ed190aca128b")

.then(response => response.json())

//.then(data => console.log(data)); {

//for (var i = 0; i < 11; i ++) {
	//let title = data.results.title[i];
	//let image = data.results.image[i];
	//console.log(title, image);
//}
	//displayRecipeList(data);

//};


// DONE - Used bootstrap in HTML.   Click event for when "Click here to begin" button is selected-

//SEARCH FUNCTION
$("#find-recipe").click(function(event){
    console.log("clicked");

    event.preventDefault();

    //getting text from ingredient input
    var ingredientSearchEl = $("#ingredient-search").val().trim();

    //fetch by ingredient, DELIMIMED BY A COMMA!!!
    fetch("https://api.spoonacular.com/recipes/complexSearch?apiKey=5e85b9e168244c1cbbe7ed190aca128b" + ingredientSearchEl)
        .then(function(response){
            return response.json();
        })
        //need to get array and run search




    //getting text from name of recipe input 
    var recipeNameEl = $("#query-search").val().trim();


    //clear content out after search
    $("#ingredient-search").val("");
    $("#query-search").val("");
})
////DONE - Used bootstrap in HTML.  Upon click, modal will open with two text entry boxes and a search button
	// Modal opens with heading "Search Here for a Recipe"

//Search by ingredient Search Box
	// clear search box after click event
	//highlight box if search data entered
	//account for invalid data entry

//Search by cusine type Search Box
	// clear search box after click event
	//highlight box if search data entered
	//account for invalid data entry

//Search button - Click event
//Do we need a second search button.  If yes, will cut down on a lot of if/then.  Currently, if we use one search button and user enters text into both boxes it will search for both.  We could also throw an error - enter information in one box only.

//Return 10 items.  Name of recipe, thumbnail and ingredient list/instructions
  //Second Modal????  New window????




  //event.preventDefault();

	// .then(function(data)
	// 	console.log(data)
	
	// })











//document.querySelector("#recipe-results").innerHTML = "Recipe Name: " + data.results[0].title


// &query=pasta&maxFat=25&





