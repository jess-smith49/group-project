//reach recipe puppy api and get a response
function getRecipe() {
    fetch("https://rapidapi.p.rapidapi.com/?p=1&i=onions%2Cgarlic&q=omelet", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "recipe-puppy.p.rapidapi.com",
		"x-rapidapi-key": "ecbb4fdfcdmshe469c646245665cp123981jsn216393625bbd"
	}
})
.then(response => {
	console.log(response);
})
.catch(err => {
	console.error(err);
});
};
getRecipe();
//use user input to search recipes 
//save select recipes to localstorage 
