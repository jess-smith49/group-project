
// create a variable 'q' for query search and 'i' for ingredients

// remove endpoints and modify fetch request to concate strings based on modal input
fetch("https://rapidapi.p.rapidapi.com/?p=1&i=onions%2Cgarlic&q=omelet", {
    "method": "GET",
    "headers": {
        "x-rapidapi-host": "recipe-puppy.p.rapidapi.com",
        "x-rapidapi-key": "358cb2fa9amshbe93bf171c704afp1d857cjsn9e3fac832eff"
    }
})
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    });

// Modal Functions 

// Add to list button


