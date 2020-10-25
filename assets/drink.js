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

    // create an empty array
    let drinkArr = [];
    let randomNumber;
    let removed = 0;
    let drinkId;
    let ranDrinkName;

    // check which input had value
    if (liquorSearchEl) {

        // fetch data by type of liquor
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${liquorSearchEl}`)
            .then(function (response) {
                return response.json();
            })
            // retrieve cocktail ID and run search by ID
            .then(function (response) {

                // run a loop to retrieve 3 random ID's
                for (var i = 0; i < 3; i++) {

                    // pick 3 random ID's
                    randomNumber = Math.floor(response.drinks.length * Math.random());

                    // create a new array
                    let ranDrinkId = response.drinks.splice(randomNumber, 1);
                    drinkArr.push(ranDrinkId);
                    removed++;

                };
            })
            .then(function (response) {

                // fetch ids from the drink array
                for (var m = 0; m < drinkArr.length; m++) {

                    drinkId = drinkArr[m][0].idDrink;

                    // fetch by ID
                    fetch('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + drinkId)
                        .then(function (response) {
                            return response.json();
                        })
                        .then(function (data) {
                            displayDrinkList(data);
                        })
                };
            });
    } else if (nameString) {

        // fetch data by drink name
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${nameString}`)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {

                // run a loop to retrieve 3 random drinks
                for (var i = 0; i < 3; i++) {

                    // pick 3 random ID's
                    randomNumber = Math.floor(data.drinks.length * Math.random());

                    // create a new array
                    let ranDrinkId = data.drinks.splice(randomNumber, 1);
                    drinkArr.push(ranDrinkId);
                    removed++;

                }
            })
            .then(function (data) {
                // fetch drinks from the drink array
                for (var m = 0; m < drinkArr.length; m++) {

                    ranDrinkName = drinkArr[m][0].strDrink;
                    console.log(ranDrinkName);

                    // fetch from new array
                    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${ranDrinkName}`)
                        .then(function (response) {
                            return response.json();
                        })
                        .then(function (data) {
                            displayDrinkList(data);
                        });
                };
            });

    } else {

        // display no results if nothing was entered
        noResults();

    };

    // clear out the text input field
    $("#liquor-search").val("");
    $("#drinkName-search").val("");

});


// function to display drinks in modal
function displayDrinkList(cocktail) {
    console.log(cocktail);
    // create a loop to go through the array and return up to 10 drinks
    let drinkSection = $("#drink-results");
    //for (var i = 0; i < 1; i++) {
    //let drinkName = $("<li>").text(cocktail.drinks[0].strDrink);
    let drinkName = cocktail.drinks[0].strDrink;
    let drinkImg = cocktail.drinks[0].strDrinkThumb;
    //let drinkIns = $("<p>").text(cocktail.drinks[0].strInstructions);
    let drinkIns = cocktail.drinks[0].strInstructions;
    //3
    // while (k < 16){
    let ingredArr = []
    let measureArr = []
    let drinkData = "";
    // create a loop to go through and return the list of ingredients
    for (var k = 1; k < 16; k++) {

        let ingredients = cocktail.drinks[0][`strIngredient${k}`];
        let measurements = cocktail.drinks[0][`strMeasure${k}`]
        // check if any of the ingredients are null or empty
        if (ingredients === null || ingredients === "") {
            break;
        } else {
            // check if any of the measurements are null or empty
            if (cocktail.drinks[0][`strMeasure${k}`] === null) {
                //drinkData = cocktail.drinks[0][`strIngredient${k}`]
                //drinkData = $("<li>").text(cocktail.drinks[0][`strIngredient${k}`])
                ingredArr.push(ingredients)

            } else {
                ingredArr.push(ingredients)
                measureArr.push(measurements);
                //console.log("INGRED", ingredArr.toString());
                //console.log("MEASURE", measureArr.toString());


            }
        }
        drinkData = "";
        for (var i = 0; i < ingredArr.length; i++) {
            var measurement = '';
            if (measureArr[i] !== undefined) {
                measurement = measureArr[i]
            }
            drinkData += measurement + " : " + ingredArr[i] + "<br>";
        };
    };


    // append to modal
    let insCard = `<div class="container-fluid" id="${k}">
    <div class="row">
    <div class="col-12 mt-3">
    <div class="card">
    <div class="card-horizontal">
    <div class="img-square-wrapper">
    <img class="card-img" src= ${drinkImg}>
    </div>
    <div class="card-body">
    <div class="card-title">${drinkName}</div>
    <div class="row">
    <div class="card-ingrdntl">${drinkData.split(',')}</div>
    </div>
    <br>
    <p class="card-text">${drinkIns}</p>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>`
    drinkSection.append(insCard);

};


// if there are no results
function noResults() {
    $("#drink-results").html('<p>No Results</p>');
};
