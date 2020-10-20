
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
    // create a loop to go through the array and return up to 10 drinks
    for (var i = 0; i < 11; i++) {
        /* let drinkSection = $("#drink-results").attr('class', 'card-deck');
         let cardBody = $("<div>").attr("class", "card-body");
         let drinkCard = $("<div>").attr('class' , 'card');
         let drinkName = $("<li>").text(cocktail.drinks[i].strDrink).attr('class', 'card-title', 'row');
         let drinkImg = $("<img>").attr('src', cocktail.drinks[i].strDrinkThumb, 'class', 'card-img');
         let drinkIns = $("<p>").text(cocktail.drinks[i].strInstructions).attr('class', 'col-md', 'card-text');
         let imgRow = $("<div>").attr('class', 'row no-gutters' );*/
         
         //call drink selection and assign card deck class
         var drinkSection = document.querySelector("#drink-results");
         drinkSection.classList.add("card-group", "container-fluid");

        //get drink title
        var drinkName = document.createElement("li");
        drinkName.classList.add("card-title")
        drinkName.textContent = cocktail.drinks[i].strDrink;
        //get drink image
        var drinkImg = document.createElement("img");
        drinkImg.classList.add("img-square-wrapper");
        drinkImg.setAttribute("src" , cocktail.drinks[i].strDrinkThumb);
        //get drink instructions
        var drinkIns = document.createElement("p");
        drinkIns.classList.add("card-text")
        drinkIns.textContent = cocktail.drinks[i].strInstructions;
        //create div elements to hold and style drink recipe cards
        var cardEl = document.createElement("div");
        cardEl.classList.add("card");

        var cardBodyEl = document.createElement("div");
        cardBodyEl.classList.add("card-body");

        var cardSizeEl = document.createElement("div");
        cardSizeEl.classList.add("col-12", "mt-3");

        var horiCardEl = document.createElement("div");
        horiCardEl.classList.add("card-horizontal");

        var rowEl = document.createElement("div");
        rowEl.classList.add("row");

        var imgSizeEl = document.createElement("div");
        imgSizeEl.classList.add("col-md-4");

        //append elements to the drink results section

       rowEl.appendChild(cardSizeEl);
       cardSizeEl.appendChild(cardEl);
       cardSizeEl.appendChild(drinkName);
       cardSizeEl.appendChild(drinkIns);
       cardEl.appendChild(horiCardEl);

       horiCardEl.appendChild(imgSizeEl);
       imgSizeEl.appendChild(drinkImg);

       horiCardEl.appendChild(cardBodyEl);

       drinkSection.appendChild(rowEl);


        //finish appending proper divs inside of other divs--figure out proper order.
        //add save button to each card 


        



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
};




