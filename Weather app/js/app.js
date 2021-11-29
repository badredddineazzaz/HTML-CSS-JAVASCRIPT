//Random quote
function randomQuote() {
    fetch("https://api.quotable.io/random?maxLength=50").then(res => res.json()).then(result => {
        // handle the response
        console.log(result.content);
        document.querySelector(".quote").innerText = `"` + result.content + `"`;

    });
}


//Sunrise Sunset

function sunSet(lat, lng) {
    fetch("https://api.sunrise-sunset.org/json?lat=" + lat + "&lng=" + lng).then(res => res.json()).then(result => {
        index = result.results.sunset.slice(8, 11);
        // console.log(index);
        // console.log(result.results.sunset);
        time = result.results.sunset.slice(0, 5);
        // console.log(time);
        document.querySelector("#sunset").innerText = time + index;
    });
}
function sunRise(lat, lng) {
    fetch("https://api.sunrise-sunset.org/json?lat=" + lat + "&lng=" + lng).then(res => res.json()).then(result => {
        index = result.results.sunrise.slice(8, 11);
        time = result.results.sunrise.slice(0, 5);
        document.querySelector("#sunrise").innerText = time + index;
    });
}




//weather

let weather = {
    apiKey: "5193ad11f98765bce5d0cfd6a74c067a",
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" +
            city +
            "&units=metric&appid=" +
            this.apiKey
        )
            .then((response) => {
                if (!response.ok) {
                    document.getElementById("error-box").style.visibility = "visible";
                    document.querySelector(".error-text").innerText = `Sorry, Can't find weather info for the city: "` + city + `"!`;
                    throw new Error("No weather found.");
                }
                return response.json();
            })
            .then((data) => this.displayWeather(data));
    },

    displayWeather: function (data) {
        document.getElementById("error-box").style.visibility = "hidden";
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        const { country } = data.sys;
        const { lon, lat } = data.coord;
        document.querySelector(".cityname").innerText = name + ", " + country;
        document.querySelector(".icon").src =
            "./icons/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp;
        document.querySelector("#humidity").innerText = humidity + " %";
        document.querySelector("#wind").innerText = speed;
        sunSet(lat, lon);
        sunRise(lat, lon);
        document.title = temp + "°C in " + name + " | My Weather";


    },
    search: function () {
        this.fetchWeather(document.querySelector(".cityinput").value);
    },
};

//search button
document.querySelector("#add").addEventListener("click", function () {
    weather.search();
    randomQuote();
});

//Click on enter
var input = document.getElementById("cityoutput");
input.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        document.getElementById("add").click();
        console.log("enter");
    }
});




weather.fetchWeather("el jadida");
randomQuote();

