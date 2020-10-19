
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
        // retrieve cocktail ID and run search by ID
        .then(function (response) {
            for (var i = 0; i < 11; i++) {
                let drinkId = response.drinks[i].idDrink;
                //console.log(drinkId)
                fetch('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + drinkId)
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (data) {
                        console.log(data);
                        displayDrinkList(data);
                    })
            }
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
                displayDrinkList(data);
            })
            // clear out user input
            .then(function () {
                return $("#drinkName-search").empty();
            })
    } else {
        // display a message to user that there is no result and run a new search
        console.log("no results")
    }

});

// function to display drinks in modal
function displayDrinkList(cocktail) {
    for (var i = 0; i < 11; i++) {
        let drinkSection = $("#drink-results");
        let drinkName = $("<li>").text(cocktail.drinks[i].strDrink);
        let drinkImg = $("<img>").attr('src', cocktail.drinks[i].strDrinkThumb);
        let drinkIns = $("<p>").text(cocktail.drinks[i].strInstructions);
        drinkSection.append(drinkName, drinkImg);
        for (var k = 1; k < 16; k++) {
            if (cocktail.drinks[i][`strIngredient${k}`] == null || cocktail.drinks[i][`strIngredient${k}`] == "") {
                break;
            } else {

                drinkData = $("<li>").text(cocktail.drinks[i][`strIngredient${k}`])
    
                drinkSection.append(drinkData, drinkIns);
            }
        }
        
    }
};




// add an 'add' button to each result, once add button is clicked, attach it to the "Your Meals" section



