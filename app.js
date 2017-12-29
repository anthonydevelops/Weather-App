const city = document.querySelector("#city");
const temperature = document.querySelector("#weather")
const main = document.querySelector(".data");

//On start, check if geolocation is available. If not, report it.
window.onload = () => {
  if("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(getData);
  } else {
    city.innerHTML = "Geolocation not supported";
  }
}

//Capture lat & long, then access the api which will display local weather data
const getData = (position) => {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const url = "https://fcc-weather-api.glitch.me/api/current?lat=" + latitude + "&lon=" + longitude;
  accessApi(url);
}

//Fetch data from FreeCodeCamp api
function accessApi(url) {
  fetch(url)
    .then((resp) => resp.json())
    .then(function(data) {
      let condition = data.weather[0].main;
      let temp = data.main.temp;
      let weatherIcon = data.weather[0].icon;
      showData(condition, temp, weatherIcon);
    })
    .catch(function(e) {
      console.log(e);
    });
}

//Display weather data & image
function showData(cond, temp, image) {
  const newImage = document.createElement("IMG");
  newImage.setAttribute("src", image);
  main.appendChild(newImage);
  temperature.innerHTML = cond + " " + temp;
}
