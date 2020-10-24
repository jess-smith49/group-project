//search function
$("#find-recipe").click(function(event){
    event.preventDefault();
	//empty modal before new search
    $("#recipe-results").empty();
    //get text from query input
    var recipeNameEl = $("#query-search").val().trim();

	//fetch by meal name
    fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${recipeNameEl}`
        //`https://api.spoonacular.com/recipes/complexSearch?apiKey=2f81e89ecfed45b184b782b656464a48&query=${recipeNameEl}&addRecipeInformation=true&fillIngredients=true`
        //`https://api.spoonacular.com/recipes/complexSearch?apiKey=2f81e89ecfed45b184b782b656464a48&query=${recipeNameEl}&showIngredients=true&instructionsRequired=true`
    )
    .then(function(response){
        return response.json();
    })
    .then(function(response){
		
		//getting recipe id and searching by the id
         for(var k = 0; k < 3; k++){
             let recipeId = response.meals[k].idMeal;

            fetch(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`
             ) 
             .then(function(response){
                 return response.json();
             })
             .then(function(data){
                 console.log(data);
                displayRecipes(data);
             })
     };
        
        
        console.log(data);
        
    })

    $("#query-search").val("");
});





//display function
function displayRecipes (recipe){
    console.log(recipe);
    
	//declaring the variables to the data
    let recipeSection = $("#recipe-results");
    let recipeName = recipe.meals[0].strMeal;
	let recipeImg = recipe.meals[0].strMealThumb;
	let recipeIns = recipe.meals[0].strInstructions;

	for (var k = 1; k < 16; k++) {
        // check if any of the ingredients are null or empty
        if (recipe.meals[0][`strIngredient${k}`] === null || recipe.meals[0][`strIngredient${k}`] === "") {
            break;
        } else {
            // check if any of the measurements are null or empty
            if (recipe.meals[0][`strMeasure${k}`] === null) {
                drinkData = recipe.meals[0][`strIngredient${k}`]
                //drinkData = $("<li>").text(cocktail.drinks[0][`strIngredient${k}`])

                
            } else {
                // retrieve the measurement and ingredients
                recipeData = recipe.meals[0][`strMeasure${k}`] + ' : ' + recipe.meals[0][`strIngredient${k}`]
				//   drinkData = $("<li>").text(cocktail.drinks[0][`strMeasure${k}`] + ' : ' + cocktail.drinks[0][`strIngredient${k}`])
				console.log(recipeData);
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
	<div class="card-instructions">${recipeIns}</div>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>`

    
    //let recipeName = $("<li>").text(recipe.meals[0].strMeal);
    //let recipeImg = $("<img>").attr('src', recipe.meals[0].strMealThumb);
    
    //recipeSection.append(recipeName, recipeImg);
    recipeSection.append(recipeCard);

        
};


















