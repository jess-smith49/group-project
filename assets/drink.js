
// event function when search button is clicked
$("#find-drink").click(function (event) {
    event.preventDefault();


    // if searching by liquor type, retrieve text from input field
    var liquorSearchEl = $("#liquor-search").val().trim();

    // fetch data by type of liquor
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${liquorSearchEl}`)
        .then(function (response) {
            return response.json();
        })
            // retrieve cocktail ID and run search by ID
            .then(function (response) {
                for (var i = 0; i < 11; i++) {
                    let drinkId = response.drinks[i].idDrink;
                    //console.log(drinkId)
                    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`)
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
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkNameSearchEl}`)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                displayDrinkList(data);
            });

        // reset input field

    } else {
        // display a message to user that there is no result and run a new search
        console.log("no results")
    }

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
    let drinkImg =  cocktail.drinks[0].strDrinkThumb;
    //let drinkIns = $("<p>").text(cocktail.drinks[0].strInstructions);
    let drinkIns = cocktail.drinks[0].strInstructions;
        //3
        
        // create a loop to go through and return the list of ingredients
        for (var k = 1; k < 16; k++) {
        // check if any of the ingredients are null or empty
        if (cocktail.drinks[0][`strIngredient${k}`] === null || cocktail.drinks[0][`strIngredient${k}`] === "") {
            break;
        } else {
            // check if any of the measurements are null or empty
            if (cocktail.drinks[0][`strMeasure${k}`] === null) {
                drinkData = cocktail.drinks[0][`strIngredient${k}`]
                //drinkData = $("<li>").text(cocktail.drinks[0][`strIngredient${k}`])

                
            } else {
                // retrieve the measurement and ingredients
                drinkData = cocktail.drinks[0][`strMeasure${k}`] + ' : ' + cocktail.drinks[0][`strIngredient${k}`]
                //   drinkData = $("<li>").text(cocktail.drinks[0][`strMeasure${k}`] + ' : ' + cocktail.drinks[0][`strIngredient${k}`])
            }
        };
    }
    // append to modal
    let insCard = `<div class="container-fluid" id="card${i}">
    <div class="row">
    <div class="col-12 mt-3">
    <div class="card">
    <div class="card-horizontal">
    <div class="img-square-wrapper">
    <img class="card-img" src= ${drinkImg}>
    </div>
    <div class="card-body">
    <div class="card-title">${drinkName}</div>
    <p class="card-text">${drinkData}</p>
    <p class="card-text">${drinkIns}</p>
    </div>
    <div class="modal-footer>
    <button class="btn btn-secondary btn-sm saveBtn" id="${i}" type="submit">Click to Save</button>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>`
    drinkSection.append(insCard);
        
    }








$(".saveBtn").click(function(event){
    var allSavedDrinks = [];
    var storedDrinks = JSON.parse(localStorage.getItem("stored-drinks"));

    if(storedDrinks != null){
        allSavedDrinks = storedDrinks
    }
    var savedDrinksId = this.attr("id");
    var savedDrinks = $(`#card${storedDrinksId}`);

    $("saved-results").append(savedDrinks);

    allSavedDrinks.push(savedDrinks);

    localStorage.setItem("stored-drinks", allSavedDrinks);
})

