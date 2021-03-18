const apiKey = "39f9546ef6f0a5b89bcb24b85f3a883a"
const date = moment().format("MM/DD/YYYY");
const locationInput = JSON.parse(localStorage.getItem("locationArray")) || [];

let weatherAPI = function (city) {
    let apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey;

    fetch(apiURL)
        .then(function (response) {
            response.json().then(function (data) {
                console.log(data);

                let currentCity = data.name;
                console.log(currentCity);
                $("#current-city").text(currentCity + " (" + date + ")");
                let currentCityImg = $("<img>").attr("src", "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
                $("#current-city").append(currentCityImg);

                let currentTemp = data.main.temp;
                console.log(currentTemp);
                $("#current-temp").text("Temperature: " + Math.round(currentTemp) + "°F");

                let currentWeatherCondition = data.weather[0].main;
                console.log(currentWeatherCondition);

                let currentHumidity = data.main.humidity;
                console.log(currentHumidity);
                $("#current-humidity").text("Humidity: " + currentHumidity + "%");

                let currentWindSpeed = data.wind.speed;
                console.log(currentWindSpeed);
                $("#current-wind-speed").text("Wind Speed: " + currentWindSpeed + "MPH");

                // Creating variables to store coordinates, based on user search of city, to input as a parameter in secondApi
                let currentLat = data.coord.lat
                let currentLon = data.coord.lon

                const secondApi = "https://api.openweathermap.org/data/2.5/onecall?lat=" + currentLat + "&lon=" + currentLon + "&exclude=hourly,daily&appid=" + apiKey;

                fetch(secondApi)
                .then(function(response) {
                    response.json().then(function(data) {
                        console.log(data);
                        let uvIndex = data.current.uvi;
                        console.log(uvIndex);
                        $("#uv-index").text("UV Index: " + uvIndex);
                        if (uvIndex <= 2) {
                            $(".row").children(".card-body").children(".index-value").addClass("green")
                        } 
                    })
                })
            })
        })
};

let index = 1;
let fiveDayWeather = function (city) {
    let apiURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + apiKey;

    fetch(apiURL)
        .then(function (response) {
            response.json().then(function (data) {
                console.log(data);

                for (i = 0; i < data.list.length; i++) {
                    // This is saying in dt_txt look for the value of 00:00:00
                    // If the value of 00:00:00 doesn't exist, then the array is empty because an array can't have a negative index 
                    if (data.list[i].dt_txt.indexOf("00:00:00") !== -1) {
                        console.log(data.list[i]);

                        // new Date is creating a new date for each day
                        let fiveDayDate = new Date(data.list[i].dt_txt).toLocaleDateString();
                        let pTagOne = $("<h4>").text(fiveDayDate);
                        let fiveDayDateImg = $("<img>").attr("src", "https://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png")

                        let fiveDayTemp = data.list[i].main.temp;
                        let pTagTwo = $("<p>").text("Temperature: " + Math.round(fiveDayTemp) + "°F");

                        let fiveDayHumidity = data.list[i].main.humidity;
                        let pTagThree = $("<p>").text("Humidity: " + fiveDayHumidity + "%");

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

}

$("#searchBtn").on("click", function (event) {
    // prevents the page from refreshing, which will allow the data from API to populate in the cards
    event.preventDefault();
    let searchCity = $("#search-city").val().trim();
    
    // Takes the string value from user input and pushes it into an array
    locationInput.push(searchCity);
    console.log(searchCity);
    localStorage.setItem("locationArray", JSON.stringify(locationInput));
    
    // Passing in the user input value as an argument into the functions
    weatherAPI(searchCity);
    fiveDayWeather(searchCity);

})