function formateDate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}
function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector(`#forecast`);
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
   <div class="col-2">
            <div class="weather-forecast-date">${day}</div>
  <img src="http://openweathermap.org/img/wn/03d@2x.png" alt="" width="42" />
  <div class="weather-forecast-temperatures">
  <span class="weather-forecast-temperatures-max">
  24°C/</span>
  <span class="weather-forecast-temperatures-min">15°C</span></div>
  </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = `c95d60a1e3adbeb286133f1ebebc2579`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function showTemperature(response) {
  celsiusTemperature = response.data.main.temp;
  let currentTemperature = Math.round(celsiusTemperature);
  let currentTempmin = Math.round(response.data.main.temp_min);
  let currentTempmax = Math.round(response.data.main.temp_max);
  let currentWind = Math.round(response.data.wind.speed);
  let currentHumidity = response.data.main.humidity;
  document.querySelector(`#wind`).innerHTML = `Windspeed:${currentWind}km/h`;
  document.querySelector(`#description`).innerHTML =
    response.data.weather[0].description;
  document.querySelector(`#tempa`).innerHTML = `${currentTemperature}`;
  document.querySelector(`#citiy`).innerHTML = response.data.name;
  document.querySelector(
    `#maxmin`
  ).innerHTML = `Today ${currentTempmax}°C/${currentTempmin}°C`;
  document.querySelector(`#humid`).innerHTML = `Humidity:${currentHumidity}%`;
  let dateElement = document.querySelector("#daytime");
  dateElement.innerHTML = formateDate(response.data.dt * 1000);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}
function search(city) {
  let apiKey = `c95d60a1e3adbeb286133f1ebebc2579`;
  let units = `metric`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}
function handleSearch(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector(`#exampleInputlocation`).value;
  search(cityInputElement);
}
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(`#tempa`);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}
function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(`#tempa`);
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
let celsiusTemperature = null;
let form = document.querySelector(`#search-form`);
form.addEventListener(`submit`, handleSearch);
let fahrenheitLink = document.querySelector(`#fahrenheit-link`);
fahrenheitLink.addEventListener(`click`, displayFahrenheitTemperature);
let celsiusLink = document.querySelector(`#celsius-link`);
celsiusLink.addEventListener(`click`, displayCelsiusTemperature);
search("New York");
