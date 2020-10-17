
// event function when search button is clicked
$("#find-drink").click(function (event) {
    event.preventDefault();


    // if searching by liquor type, retrieve text from input field
    var liquorSearchEl = $("#liquor-search").val().trim();

    // fetch data by type of liquor
    fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + liquorSearchEl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            // for (var i = 0; i < 11; i ++) {
            //     let name = data.drinks[i].strDrink;
            //     let img = data.drinks[i].strDrinkThumb;
            //     console.log(name, img);
        //}
            displayDrinkList(data);
});

// if searching by name, retrieve text from input field
var drinkNameSearchEl = $("#drinkName-search").val().trim();
console.log(drinkNameSearchEl);

if (drinkNameSearchEl) {
    // fetch data by drink name (note-if the drink name is two words long, the two words should be separated by an underscore)
    fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + drinkNameSearchEl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // console.log(data);
            displayDrinkList(data);

        })
} else {

    console.log("invalid");
}

});

// function for drink search
function displayDrinkList(cocktail) {
    console.log(cocktail.drinks[0]);
    for (var i = 0; i < 11; i++) {
        let name = cocktail.drinks[i].strDrink;
        let img = cocktail.drinks[i].strDrinkThumb;
        console.log(name, img);
        let drinkSection = $("#drink-results");
        let drinkName = $("<li>").text(cocktail.drinks[i].strDrink);
        let drinkImg = $("<img>").attr('src', cocktail.drinks[i].strDrinkThumb);
        drinkSection.append(drinkName, drinkImg);
    }
}




// add an 'add' button to each result, once add button is clicked, attach it to the "Your Meals" section



