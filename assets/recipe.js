renderCards();
//SEARCH FUNCTION
$("#find-recipe").click(function (event) {
	console.log("clicked");

	event.preventDefault();

	//getting text from query input
	var recipeNameEl = $("#query-search").val().trim();

	//fetch by meal aname, DELIMIMED BY A COMMA!!!
	fetch("https://api.spoonacular.com/recipes/complexSearch?apiKey=5e85b9e168244c1cbbe7ed190aca128b&query=" + recipeNameEl)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			console.log(data);
			displayRecipeList();
		})



	//clear content out after search
	$("#query-search").val("");
});

function displayRecipeList(results) {
	console.log(results)
	for (var i = 0; i < 11; i++) {
		let recipeSection = $("#recipe-results");
		let recipeName = results[i].title;
		let recipeImg = results[i].image;

		let recipeCard = `<div class="container-fluid" id="card${i}">
		<div class="row">
    		<div class="col-12 mt-3">
    			<div class="card">
    				<div class="card-horizontal">
   						 <div class="img-square-wrapper">
   							 <img class="card-img" src= ${recipeImg}>
    						</div>
    							<div class="card-body">
    								<div class="card-title">${recipeName}</div>
    							</div>
    							<div class="card-footer>
    								<button class="btn btn-secondary btn-sm saveBtn" id="${i}" type="submit">Click to Save</button>
    							</div>
    						</div>
    					</div>
    				</div>
    			</div>
    	</div>`
		recipeSection.append(recipeCard);

	}
}

$(".saveBtn").click(function(event){
    var allSavedRecipes = [];
    var storedRecipes = JSON.parse(localStorage.getItem("stored-recipes"));
    if(storedRecipes != null){
       allSavedRecipes = storedRecipes 
    }

    //getting the exact ID
    var savedCardId = this.attr("id");
    //pointin to whole recipe card
    var savedCard = $(`#card${savedCardId}`);
    //append to page
    //$("#saved-results").append(savedCard);
    //add saved card to array
    allSavedRecipes.push(savedCard);

    localStorage.setItem("stored-recipes", allSavedRecipes);
    renderCards();

})

function renderCards (){
    //get Item for mlocal storage
    //clear anything thats in there
    //loop through - for each card display
    //line 70 to append

}
















