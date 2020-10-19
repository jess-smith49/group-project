//Example Request and Response

var recipeNameEl = "recipe-results"

fetch("https://api.spoonacular.com/recipes/complexSearch?apiKey=5e85b9e168244c1cbbe7ed190aca128b&query=pasta&maxFat=25&")

.then(response => response.json())
.then(data => console.log(data)); 






//document.querySelector("#recipe-results").innerHTML = "Recipe Name: " + data.results[0].title

	



		







