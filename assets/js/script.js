const apiKey = "39f9546ef6f0a5b89bcb24b85f3a883a";
const date = moment().format("MM/DD/YYYY");
const locationInput = JSON.parse(localStorage.getItem("locationArray")) || [];

const weatherAPI = function (city) {
    const apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey;

    fetch(apiURL)
    .then(function (response) {
        response.json().then(function (data) {
            // console.log(data);

            const currentCity = data.name;
            // console.log(currentCity);
            $("#current-city").text(currentCity + " (" + date + ")");
            const currentCityImg = $("<img>").attr("src", "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
            $("#current-city").append(currentCityImg);

            const currentTemp = data.main.temp;
            // console.log(currentTemp);
            $("#current-temp").text("Temperature: " + Math.round(currentTemp) + "°F");

            const currentWeatherCondition = data.weather[0].main;
            console.log(currentWeatherCondition);

            const currentHumidity = data.main.humidity;
            // console.log(currentHumidity);
            $("#current-humidity").text("Humidity: " + currentHumidity + "%");

            let currentWindSpeed = data.wind.speed;
            // console.log(currentWindSpeed);
            $("#current-wind-speed").text("Wind Speed: " + currentWindSpeed + "MPH");

            // Creating variables to store coordinates, based on user search of city, to input as a parameter in secondApi
            const currentLat = data.coord.lat;
            const currentLon = data.coord.lon;

            const secondApi = "https://api.openweathermap.org/data/2.5/onecall?lat=" + currentLat + "&lon=" + currentLon + "&exclude=hourly,daily&appid=" + apiKey;

            fetch(secondApi)
            .then(function (response) {
                response.json().then(function (data) {
                    // console.log(data);
                    const uvIndex = data.current.uvi;
                    console.log(uvIndex);
                    $("#uv-index").empty("");
                    $("#uv-color").removeClass("hide");
                    $("#uv-index").prepend("UV Index: ");
                    $("#uv-color").text(uvIndex);
                    if (uvIndex <= 2) {
                        $("#uv-color").removeClass();
                        $("#uv-color").addClass("green");
                    } else if (uvIndex <= 5) {
                        $("#uv-color").removeClass();
                        $("#uv-color").addClass("yellow");
                    } else if (uvIndex <= 7) {
                        $("#uv-color").removeClass();
                        $("#uv-color").addClass("orange");
                    } else {
                        $("#uv-color").removeClass();
                        $("#uv-color").addClass("red");
                    }
                })
            })
        })
    })
};

const fiveDayWeather = function (city) {
    let index = 1;
    const apiURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + apiKey;

    fetch(apiURL)
    .then(function (response) {
        response.json().then(function (data) {
            // console.log(data);

            // Clears cards for new set of data
            $("#Day-1").empty("");
            $("#Day-2").empty("");
            $("#Day-3").empty("");
            $("#Day-4").empty("");
            $("#Day-5").empty("");

            for (let i = 0; i < data.list.length; i++) {
                // This is saying in dt_txt look for the value of 00:00:00
                // If the value of 00:00:00 doesn't exist, then the array is empty because an array can't have a negative index 
                if (data.list[i].dt_txt.indexOf("00:00:00") !== -1) {
                    // console.log(data.list[i]);

                    // new Date is creating a new date for each day
                    const fiveDayDate = new Date(data.list[i].dt_txt).toLocaleDateString();
                    const pTagOne = $("<h4>").text(fiveDayDate);
                    const fiveDayDateImg = $("<img>").attr("src", "https://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png");

                    const fiveDayTemp = data.list[i].main.temp;
                    const pTagTwo = $("<p>").text("Temperature: " + Math.round(fiveDayTemp) + "°F");

                    const fiveDayHumidity = data.list[i].main.humidity;
                    const pTagThree = $("<p>").text("Humidity: " + fiveDayHumidity + "%");

                    $(`#Day-${index}`).append(pTagOne);
                    $(`#Day-${index}`).append(fiveDayDateImg);
                    $(`#Day-${index}`).append(pTagTwo);
                    $(`#Day-${index}`).append(pTagThree);
                    index++;
                }
            }
        })
    })
};

function loadPreviousData() {
    // Targets the id of previous-search and clears the previous searches
    $("#previous-search").empty("");

    // Taking the array locationInput and only showing index values from 0-10
    const limitItemBtn = locationInput.slice(0, 10);
    $(limitItemBtn).each(function (index) {
        // console.log(index);

        const reloadSearch = locationInput[index];
        // console.log(reloadSearch);

        const createListBtn = $("<li>").text(reloadSearch).addClass("list-group-item list-group-item-action mt-2 ");
        // console.log(createListBtn);

        $("#previous-search").append(createListBtn);
    })
};

// Function executes the weatherAPI & fiveDayWeather, which will display current and 5 day forecast into the id of previous-search
$("#previous-search").on("click", "li", function () {
    weatherAPI($(this).text());
    fiveDayWeather($(this).text());
})

$("#searchBtn").on("click", function (event) {
    // prevents the page from refreshing, which will allow the data from API to populate in the cards
    event.preventDefault();
    const searchCity = $("#search-city").val().trim();

    if (locationInput.indexOf(searchCity) === -1) {

        // Takes the string value from user input and pushes it into an array
        locationInput.push(searchCity);
        // console.log(searchCity);

        localStorage.setItem("locationArray", JSON.stringify(locationInput));
    }
    // Passing in the user input value as an argument into the functions to be used later
    weatherAPI(searchCity);
    fiveDayWeather(searchCity);
    loadPreviousData();
})

// When the user refreshes the page, this function will run, which will show the previous searches
loadPreviousData();