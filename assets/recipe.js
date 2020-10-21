

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

		let recipeCard = `<div class="container-fluid">
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
    								<button class="btn btn-secondary btn-sm" id="saveBtn" type="submit">Click to Save</button>
    							</div>
    						</div>
    					</div>
    				</div>
    			</div>
    	</div>`
		recipeSection.append(recipeCard);

	}
}

















