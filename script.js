// Flow of activities we will do :

// We need object to store functions and variables necessary for using API
// Then we declare a fetchWeather function that sends requests to the API by providing a city name and asks for weather
// API returns the request
// Afer that, we create a function called displayWeather to show results on the page

let weather = {
  //apiKey is used to access weather -- given via OpenWeatherApp
  apiKey: "2e5534b50911519d60777feee2576606",

  // a function called fetchWeather to request data from API
  fetchWeather: function (city) {
    // it will do fetch of a URL
    fetch(
      // units in metric added
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      // if no location is given -- edge case check
      .then((response) => {
        if (!response.ok) {
          alert("No City or Country found.");
          throw new Error("No weather found.");
        }

        // once URL is fetched, do response.json()
        return response.json();
      })

      // then take that data and pass it to another function named displayWeather
      .then((data) => this.displayWeather(data));
  },

  // this is the function that takes in data and displays weather
  displayWeather: function (data) {
    const { name } = data; // this will extract name from the object data and store it in a variable "name"
    const { icon, description } = data.weather[0]; // this will extract icon and description from API
    const { temp, humidity } = data.main; // this will extract temperature and humidity from API
    const { speed } = data.wind; // this will extract speed from API and convert it to a variable

    // now our job is to display these data points on the page
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " km/h";
    document.querySelector(".weather").classList.remove("loading");

    // to show background as per the given location in the search box
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";
  },

  // passing input location to fetchWeather
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

// making the button dynamic : whenever button will be clicked, run the function below
document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

// making the web app accept enter as also a form of button
document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("Delhi");
