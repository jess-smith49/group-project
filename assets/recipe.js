console.log("Hello World");


var mealInput = "spaghetti"

fetch("https://recipe-puppy.p.rapidapi.com/?p=1&q="+ "spaghetti", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "recipe-puppy.p.rapidapi.com",
		"x-rapidapi-key": "736dc35b66msh2bcbc7d41dedb3ap1dfeffjsn376e4d505821"
	}
})
.then(function(response) {
  

  return response.json();
})

.then(function(response) 
{ 

// 	var responseContainerEl = document.querySelector("#response-container");

// 	var recipeName = document.createElement("title");
	
//recipeName.setAttribute(response.data.title);

// 	responseContainerEl.appendChild(gifImg);


});

