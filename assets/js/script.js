let weatherAPI = function () {
    let apiURL = "https://api.openweathermap.org/data/2.5/weather?q=Seattle&units=imperial&appid=39f9546ef6f0a5b89bcb24b85f3a883a";


    fetch(apiURL)
    .then(function (response) {
        response.json().then(function (data) {
            console.log(data)
            console.log(response)

            let currentCity = data.name;
            console.log(currentCity);
            $("#current-city").text("Name of City: " + currentCity);

            let currentTemp = data.main.temp;
            console.log(currentTemp);
            $("#current-temp").text("Temperature: " + Math.round(currentTemp) + " °F");

            let currentWeatherCondition = data.weather[0].main;
            console.log(currentWeatherCondition);

            let currentHumidity = data.main.humidity;
            console.log(currentHumidity);
            $("#current-humidity").text("Humidity: " + currentHumidity + "%");

            let currentWindSpeed = data.wind.speed;
            console.log(currentWindSpeed);
            $("#current-wind-speed").text("Wind Speed: " + currentWindSpeed + " MPH");
        })
    })
}

let secondFetch = function () {
    let apiURL = "https://api.openweathermap.org/data/2.5/forecast?q=Seattle&units=imperial&appid=39f9546ef6f0a5b89bcb24b85f3a883a"

    fetch(apiURL)
    .then(function(response) {
        response.json().then(function(data) {
            console.log(data)
            console.log(response)
        })
    })
}

let thirdFetch = function () {
    let apiURL = "https://api.openweathermap.org/data/2.5/onecall?lat=47.608013&lon=-122.335167&exclude=current,daily,alerts&appid=39f9546ef6f0a5b89bcb24b85f3a883a"

    fetch(apiURL)
    .then(function(response) {
        response.json().then(function(data) {
            console.log(data)
            console.log(response)
        })
    })
}

weatherAPI();
secondFetch();
thirdFetch();

$("#searchBtn").on("click", function () {
    let searchCity = $("#search-city").val().trim();
    let saveCityLocation = localStorage.setItem("City", searchCity);

})
// hard code city name
// get data and returning data