// const searchCity


// 3 separate fetches

let weatherAPI = function() {
    const apiURL = "https:/api.openweathermap.org/data/2.5/weather?q=Seattle&units=imperial&appid=39f9546ef6f0a5b89bcb24b85f3a883a";
    

    fetch(apiURL)
    .then(function(response) {
        response.json().then(function(data) {
            console.log(data)
            console.log(response)

            let currentCity = data.name;
            console.log(currentCity);

            let currentTemp = data.main.temp;
            console.log(currentTemp);

            let currentWeatherCondition = data.weather[0].main;
            console.log(currentWeatherCondition);

            let windSpeed = data.wind.speed;
            console.log(windSpeed);
        })
    })

}

weatherAPI();

$("#searchBtn").on("click", function () {
    let searchCity = $("#search-city").val().trim();
    localStorage.setItem(searchCity);
})
// hard code city name
// get data and returning data
// 