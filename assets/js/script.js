let weatherAPI = function () {
    let apiURL = "https://api.openweathermap.org/data/2.5/weather?q=Seattle&units=imperial&appid=39f9546ef6f0a5b89bcb24b85f3a883a";

    fetch(apiURL)
        .then(function (response) {
            response.json().then(function (data) {
                console.log(response)
                console.log(data)

                let currentCity = data.name;
                console.log(currentCity);
                
                $("#current-city").text("Name of City: " + currentCity);
                let currentCityImg = $("<img>").attr("src", "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png")
                $("#current-city").append(currentCityImg)

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

let index = 1;
let secondFetch = function () {
    let apiURL = "https://api.openweathermap.org/data/2.5/forecast?q=Seattle&units=imperial&appid=39f9546ef6f0a5b89bcb24b85f3a883a"

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
                        let pTagOne = $("<p>").text(fiveDayDate);
                        console.log(pTagOne);

                        let fiveDayTemp = data.list[i].main.temp;
                        let pTagTwo = $("<p>").text(fiveDayTemp)
                        console.log(pTagTwo);

                        let fiveDayHumidity = data.list[i].main.humidity;
                        let pTagThree = $("<p>").text(fiveDayHumidity)
                        console.log(pTagThree);

                        $(`#Day-${index}`).append(pTagOne)
                        $(`#Day-${index}`).append(pTagTwo);
                        $(`#Day-${index}`).append(fiveDayHumidity)
                        index++;
                    }
                }
            })
        })
}

let thirdFetch = function () {
    let apiURL = "https://api.openweathermap.org/data/2.5/onecall?lat=47.608013&lon=-122.335167&exclude=current,daily,alerts&appid=39f9546ef6f0a5b89bcb24b85f3a883a"

    fetch(apiURL)
        .then(function (response) {
            response.json().then(function (data) {
                console.log(data)
                console.log(response)
                let uvIndex = data.hourly[0].uvi
                console.log(uvIndex)
                $("#uv-index").text("UV Index: " + uvIndex);
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