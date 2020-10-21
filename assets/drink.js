
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
                // let drinkArr = [];
                // for (var d = 0; d < response.length; d++) {
                //     let randomDrinks = response.splice(Math.random(Math.floor() * response.length), 10);
                //     drinkArr.push(randomDrinks);
                //     console.log(drinkArr);

                // run a loop to retrieve all results
                for (var i = 0; i < 11; i++) {

                    let drinkId = response.drinks[i].idDrink;

                    fetch('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + drinkId)
                        .then(function (response) {
                            return response.json();
                        })
                        .then(function (data) {
                            displayDrinkList(data);
                        })
                }
                //}
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
        };
    }
    // append to modal
    let insCard = `<div class="container-fluid">
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
    <button class="btn btn-secondary btn-sm" id="saveBtn" type="submit">Click to Save</button>
    </div>
    </div>
    </div>
    </div>
    </div>`
    drinkSection.append(insCard);

<<<<<<< HEAD
    
<<<<<<< HEAD
 
=======


//     //}



//      // drinkSection.append(insCard);
//     //  drinkSection.append(
//     //         $('<div/>', { 'class': 'container-fluid' }).append(
//     //             $('<div/>', { 'class': 'row' }).append(
//     //                 $('<div/>', { 'class': 'col-12 mt-3' }).append(
//     //                     $('<div/>', { 'class': 'card' }).append(
//     //                         $('<div/', { 'class': 'card-horizontal' }).append(
//     //                             $('<div/>', { 'class': 'img-square-wrapper' }).append(
//     //                                 $("<img>").attr('src', cocktail.drinks[i].strDrinkThumb, 'class', 'card-img').append
//     //                             ).append(
//     //                             $('<div/>', { 'class': 'card-body' }).append(
//     //                                 $('<div/>', { 'class': 'card-title' }).append(
//     //                                     $("<li>").text(cocktail.drinks[i].strDrink)
//     //                                 ).append(
//     //                                 $('<div/>', { 'class': 'card-text' }).append(
//     //                                     $("<p>").text(cocktail.drinks[i].strInstructions)
//     //                                 )
//     //                             )
//     //                         )
//     //                     )
//     //                 )
//     //             )  
//     //         )
//     //     )
//     //  )
//     //  )
//         //call drink selection and assign card deck class
// // var drinkSection = document.querySelector("#drink-results");
//  drinkSection.classList.add("card-group", "container-fluid");

// //get drink title
// var drinkName = document.createElement("li");
// drinkName.classList.add("card-title")
// drinkName.textContent = cocktail.drinks[i].strDrink;
// //get drink image
// var drinkImg = document.createElement("img");
// drinkImg.classList.add("img-square-wrapper");
// drinkImg.setAttribute("src" , cocktail.drinks[i].strDrinkThumb);
// //get drink instructions
// var drinkIns = document.createElement("p");
// drinkIns.classList.add("card-text")
// drinkIns.textContent = cocktail.drinks[i].strInstructions;
// //create div elements to hold and style drink recipe cards
// var cardEl = document.createElement("div");
// cardEl.classList.add("card");

// var cardBodyEl = document.createElement("div");
// cardBodyEl.classList.add("card-body");

// var cardSizeEl = document.createElement("div");
// cardSizeEl.classList.add("col-12", "mt-3");

// var horiCardEl = document.createElement("div");
// horiCardEl.classList.add("card-horizontal");

// var rowEl = document.createElement("div");
// rowEl.classList.add("row");

// var imgSizeEl = document.createElement("div");
// imgSizeEl.classList.add("col-md-4");

// //append elements to the drink results section

// rowEl.appendChild(cardSizeEl);
// cardSizeEl.appendChild(cardEl);
// cardSizeEl.appendChild(drinkName);
// cardSizeEl.appendChild(drinkIns);
// cardEl.appendChild(horiCardEl);

// horiCardEl.appendChild(imgSizeEl);
// imgSizeEl.appendChild(drinkImg);

// horiCardEl.appendChild(cardBodyEl);

// drinkSection.appendChild(rowEl);*/


//         //finish appending proper divs inside of other divs--figure out proper order.
//         //add save button to each card 
=======
}

>>>>>>> 1b75d898dd5884dde7b26b2bd2b40428411144c2

// if there are no results
function noResults() {
    $("#drink-results").html('<p>No Results</p>');
}









>>>>>>> 7e8901855c4ef1593cba8137fc2a9c0ffbc22f60
