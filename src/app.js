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
function showTemperature(response) {
  console.log(response);
  let currentTemperature = Math.round(response.data.main.temp);
  console.log(currentTemperature);
  let currentTempmin = Math.round(response.data.main.temp_min);
  console.log(currentTempmin);
  let currentTempmax = Math.round(response.data.main.temp_max);
  console.log(currentTempmax);
  let currentWind = Math.round(response.data.wind.speed);
  document.querySelector(`#wind`).innerHTML = `Windspeed:${currentWind}km/h`;
  document.querySelector(`#description`).innerHTML =
    response.data.weather[0].description;
  let currentHumidity = response.data.main.humidity;
  document.querySelector(`#tempa`).innerHTML = `${currentTemperature}`;
  document.querySelector(`#citiy`).innerHTML = response.data.name;
  document.querySelector(
    `#maxmin`
  ).innerHTML = `Today ${currentTempmax}°C/${currentTempmin}°C`;
  document.querySelector(`#humid`).innerHTML = `Humidity:${currentHumidity}%`;
  let dateElement = document.querySelector("#daytime");
  dateElement.innerHTML = formateDate(response.data.dt * 1000);
}
