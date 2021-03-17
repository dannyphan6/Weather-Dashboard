const apiKey = "39f9546ef6f0a5b89bcb24b85f3a883a"
const locationInput = JSON.parse(localStorage.getItem("locationArray")) || [];

let weatherAPI = function (city) {
    let apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey;

    fetch(apiURL)
        .then(function (response) {
            response.json().then(function (data) {
                console.log(response);
                console.log(data);

                let currentCity = data.name;
                console.log(currentCity);
                
                $("#current-city").text("Name of City: " + currentCity);
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

                let currentLat = data.coord.lat
                let currentLon = data.coord.lon

                const secondApi = "https://api.openweathermap.org/data/2.5/onecall?lat=" + currentLat + "&lon=" + currentLon + "&exclude=hourly,daily&appid=" + apiKey;

                fetch(secondApi)
                .then(function(response) {
                    response.json().then(function(data) {
                        console.log(response);
                        console.log(data);
                        let uvIndex = data.current.uvi;
                        console.log(uvIndex);
                        $("#uv-index").text("UV Index: " + uvIndex);
                        if (uvIndex <= 2) {
                            uvIndex.addClass(".green")
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
                console.log(response);

                for (i = 0; i < data.list.length; i++) {
                    // This is saying in dt_txt look for the value of 00:00:00
                    // If the value of 00:00:00 doesn't exist, then the array is empty because an array can't have a negative index 
                    if (data.list[i].dt_txt.indexOf("00:00:00") !== -1) {
                        console.log(data.list[i]);
                        let fiveDayDate = new Date(data.list[i].dt_txt).toLocaleDateString();
                        let pTagOne = $("<h4>").text(fiveDayDate);
                        console.log(data.list[i]);
                        let fiveDayDateImg = $("<img>").attr("src", "https://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png")
                        console.log(fiveDayDateImg);

                        let fiveDayTemp = data.list[i].main.temp;
                        let pTagTwo = $("<p>").text("Temperature: " + Math.round(fiveDayTemp) + "°F");
                        console.log(pTagTwo);

                        let fiveDayHumidity = data.list[i].main.humidity;
                        let pTagThree = $("<p>").text("Humidity: " + fiveDayHumidity + "%");
                        console.log(pTagThree);

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
    locationInput.push(searchCity);
    console.log(searchCity);
    localStorage.setItem("locationArray", JSON.stringify(locationInput));
    // Passing in the user input value as an argument into the functions
    weatherAPI(searchCity);
    fiveDayWeather(searchCity);

})