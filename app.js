const city = document.querySelector('#city');
const temperature = document.querySelector('#temp');
const url = 'https://fcc-weather-api.glitch.me/';

const showCity = function (position) {
  city.innerHTML = "Latitude: " + position.coords.latitude +
  "<br>Longitude: " + position.coords.longitude;
}

function getLocation() {
  if("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(showCity);
  } else {
    city.innerHTML = "Geolocation not supported";
  }
}
