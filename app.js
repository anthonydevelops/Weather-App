const city = document.querySelector("#city");
const temperature = document.querySelector("#weather")
const tempImage = document.querySelector("#icon");

window.onload = () => {
  if("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(getData);
  } else {
    city.innerHTML = "Geolocation not supported";
  }
}

const getData = (position) => {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const url = "https://fcc-weather-api.glitch.me/api/current?lat=" + latitude + "&lon=" + longitude;
  accessApi(url);
}

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

function showData(cond, temp, image) {
  temperature.innerHTML = cond + " " + temp;
  tempImage.src = image;
}
