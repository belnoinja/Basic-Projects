const Key = "5cca7cf75b7f92968f869e34c5ea094b";
const geoUrl = "http://api.openweathermap.org/geo/1.0/direct?q=";
const weatherUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  const georesponse = await fetch(geoUrl + city + `&appid=${Key}`);
  const data = await georesponse.json();

  if (data.length==0) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    let latitude = data[0].lat;
    let longitude = data[0].lon;
    const weatherresponse = await fetch(
      weatherUrl + `lat=${latitude}&lon=${longitude}&appid=${Key}`
    );
    const weatherdata = await weatherresponse.json();

    document.querySelector(".city").innerHTML = weatherdata.name;
    document.querySelector(".temp").innerHTML =
      Math.round(weatherdata.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML =
      weatherdata.main.humidity + " %";
    document.querySelector(".wind").innerHTML =
      weatherdata.wind.speed + " kmph";

    if (weatherdata.weather[0].main == "Clouds")
      weatherIcon.src = "images/clouds.png";
    else if (weatherdata.weather[0].main == "Rain")
      weatherIcon.src = "images/rain.png";
    else if (weatherdata.weather[0].main == "Clear")
      weatherIcon.src = "images/clear.png";
    else if (weatherdata.weather[0].main == "Snow")
      weatherIcon.src = "images/snow.png";
    else if (weatherdata.weather[0].main == "Drizzle")
      weatherIcon.src = "images/drizzle.png";
    else if (weatherdata.weather[0].main == "Mist")
      weatherIcon.src = "images/mist.png";

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
    searchBox.value = "";
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
