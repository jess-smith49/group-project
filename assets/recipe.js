var mealInput = "spaghetti"

fetch("https://recipe-puppy.p.rapidapi.com/?p=1&q=" + "spaghetti", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "recipe-puppy.p.rapidapi.com",
		"x-rapidapi-key": "736dc35b66msh2bcbc7d41dedb3ap1dfeffjsn376e4d505821"
	}
})
	.then(function (response) {

		return response.json();

	})

	.then(function (data) {
		console.log(data);
		console.log(data.results.title);



		var recipeNameEl = document.querySelector("#recipeName")
		recipeNameEl.textContent = data.results[0].title
	})




// 	var recipeName = document.createElement("title");

// 	document.innerHTML= results.title;

// 	console.log(data.results[0].title) 

// var recipeName.textContent = data.results[0].title	




//});

//recipeName.setAttribute(thumbnail);  for image.  Add later

// var recipeName = document.createElement("title");

// 	document.innerHTML= results.title;

// // 	var responseContainerEl = document.querySelector("#response-container");
// 	console.log(data.results[0].title) 

// // 	var recipeName = document.createElement("title");
// var recipeName.textContent = data.results[0].title

// //recipeName.setAttribute(response.data.title);

// // 	responseContainerEl.appendChild(gifImg);
