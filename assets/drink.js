
// event function when search button is clicked
$("#find-drink").click(function (event) {
    event.preventDefault();

    // empty the modal before new results are attached
    $("#drink-results").empty();

    // if searching by liquor type, retrieve text from input field
    var liquorSearchEl = $("#liquor-search").val().trim();

    // if searching by name, retrieve text from input field
    var drinkNameSearchEl = $("#drinkName-search").val();

    // if the name search is more than one word, string with an underscore
    var nameString = drinkNameSearchEl.replace(' ', '_');

    // check which input had value
    if (liquorSearchEl) {

        // fetch data by type of liquor
        fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + liquorSearchEl)
            .then(function (response) {
                return response.json();
            })
            // retrieve cocktail ID and run search by ID
            .then(function (response) {

                // assign a variable to an empty array
                let drinkArr = [];

                // run a loop to retrieve all results
                for (var i = 0; i < response.drinks.length; i++) {

                    let drinkId = response.drinks[i].idDrink;

                    fetch('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + drinkId)
                        .then(function (response) {
                            return response.json();
                        })
                        .then(function (data) {
                            console.log(data);
                            // pick 10 random drinks
                            let tenRandomDrink = data.splice(Math.floor(Math.random() * data.length), 1)
                            console.log(tenRandomDrink);
                            //displayDrinkList(data);
                        })
                    }
                });
            } else if (nameString) {
                
                // fetch data by drink name
                fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + nameString)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    displayDrinkList(data);
                });

    } else {

        // display no results if nothing was entered
        noResults();
    }

    // clear out the text input field
    $("#liquor-search").val("");
    $("#drinkName-search").val("");

});

// function to display drinks in modal
function displayDrinkList(cocktail) {
    let drinkSection = $("#drink-results");
    
    if (cocktail.drinks === null) {
        // display no results
        noResults();
    } else {
        
        // create a loop to go through the array and return drinks
        for (var i = 0; i < 11; i++) {
            
            
            let drinkName = $("<li>").text(cocktail.drinks[i].strDrink);
            let drinkImg = $("<img>").attr('src', cocktail.drinks[i].strDrinkThumb);
            let drinkIns = $("<p>").text(cocktail.drinks[i].strInstructions);
            drinkSection.append(drinkName, drinkImg);
            // create a loop to go through and return the list of ingredients
            for (var k = 1; k < 16; k++) {
                // check if any of the ingredients are null or empty
                if (cocktail.drinks[i][`strIngredient${k}`] === null || cocktail.drinks[i][`strIngredient${k}`] === "") {
                    break;
                } else {
                    // check if any of the measurements are null or empty
                    if (cocktail.drinks[i][`strMeasure${k}`] === null) {
                        drinkData = $("<li>").text(cocktail.drinks[i][`strIngredient${k}`])
                        
                    } else {
                        // retrieve the measurement and ingredients
                        drinkData = $("<li>").text(cocktail.drinks[i][`strMeasure${k}`] + ' : ' + cocktail.drinks[i][`strIngredient${k}`])
                    }
                    // append to modal
                    drinkSection.append(drinkData, drinkIns);
                }
            }

        }

    }
};

// if there are no results
function noResults() {
    $("#drink-results").html('<p>No Results</p>');
}



