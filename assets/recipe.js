
//SEARCH FUNCTION
$("#find-recipe").click(function (event) {
	event.preventDefault();
	//console.log("clicked");
	//empty modal before new search
	$("#recipe-results").empty();
	//get text from query input
	var recipeNameEl = $("#query-search").val().trim();

	let mealArr = [];
	let randNum;
	let removed = 0;
	let recipeId;

	//fetch by meal name
	fetch(
		`https://www.themealdb.com/api/json/v1/1/search.php?s=${recipeNameEl}`
		//`https://api.spoonacular.com/recipes/complexSearch?apiKey=2f81e89ecfed45b184b782b656464a48&query=${recipeNameEl}&addRecipeInformation=true&fillIngredients=true`
		//`https://api.spoonacular.com/recipes/complexSearch?apiKey=2f81e89ecfed45b184b782b656464a48&query=${recipeNameEl}&showIngredients=true&instructionsRequired=true`
	)
		.then(function (response) {
			return response.json();
		})
		.then(function (response) {
			//console.log(response.meals);
			//console.log(mealArr);
			
			//create loop to get random response
			for (var k = 0; k < 3; k++) {
				randNum = Math.floor(response.meals.length * Math.random());
				
				// create a new array
				let randRes = response.meals.splice(randNum, 1);
				//console.log(mealArr)
				mealArr.push(randRes);
				// console.log(randRes);
				// console.log(mealArr);
				//recipeId = mealArr[k][0].idMeal;
				removed++;
				//console.log(recipeId);
			};
						
		})
		.then (function (response) {
			// fetch ids from the meal array
			for (var m = 0; m < mealArr.length; m++) {
				recipeId = mealArr[m][0].idMeal;
				//console.log(recipeId);
				fetch(
					`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`
				)
					.then(function (response) {
						return response.json();
					})
					.then(function (data) {
						//console.log(data);
						displayRecipes(data);
					})
			}
		})

	$("#query-search").val("");
});

//display function
function displayRecipes(recipe) {
	console.log(recipe);

	//declaring the variables to the data
	let recipeSection = $("#recipe-results");
	let recipeName = recipe.meals[0].strMeal;
	let recipeImg = recipe.meals[0].strMealThumb;
	let recipeIns = recipe.meals[0].strInstructions;

	//for loop here for ingredient/measure array
	let ingredArr = [];
	let measureArr = [];

	for (var k = 1; k < 20; k++) {

		let ingredients = recipe.meals[0][`strIngredient${k}`];
		let measurements = recipe.meals[0][`strMeasure${k}`];
		//console.log("ingredients", ingredients);
		// check if any of the ingredients are null or empty
		if (ingredients === null || ingredients === "") {
			break;
		} else {
			// check if any of the measurements are null or empty
			if (recipe.meals[0][`strMeasure${k}`] === null) {
				recipeData = recipe.meals[0][`strIngredient${k}`]
				//drinkData = $("<li>").text(cocktail.drinks[0][`strIngredient${k}`])


			} else {
				ingredArr.push(ingredients);
				measureArr.push(measurements);
				//console.log("INGRED", ingredArr.toString());
				//console.log("MEASURE", measureArr.toString());

				// retrieve the measurement and ingredients
				recipeData = "";
				for (var i = 0; i < measureArr.length; i++) {
					recipeData += measureArr[i] + ' : ' + ingredArr[i] + '<br>';
				}

				// recipeData = recipe.meals[0][`strMeasure${k}`] + ' : ' + recipe.meals[0][`strIngredient${k}`]
				//   drinkData = $("<li>").text(cocktail.drinks[0][`strMeasure${k}`] + ' : ' + cocktail.drinks[0][`strIngredient${k}`])
				//console.log(recipeData);
			}
		};
	}

	//creating card for recipe section
	let recipeCard =
		`<div class="container-fluid">
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
	<div class="card-ingrdnt">${recipeData}</div>
	<br>
	<div class="card-instructions">${recipeIns}</div>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>`


	recipeSection.append(recipeCard);

};


















