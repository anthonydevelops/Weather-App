const weather = document.querySelector("#weather")
let tempType = 0;
let temperature = 0;
let condition = "";
let description = "";

//Using Skycons to display animated weather icons
const skycons = new Skycons({"color": "#000"});
skycons.play();

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
      condition = data.weather[0].main;
      temperature = data.main.temp;
      description = data.weather[0].description;
      showData(condition, temperature, description);
    })
    .catch(function(e) {
      console.log(e);
    });
}

//Display weather data & image
function showData(condition, temperature, description) {
  weather.innerHTML = description + " " + Math.floor(temperature) + "&#x2103";
  //Update animated Skycon image to match condition
  switch(condition.toLowerCase()) {
    case "rain":
      skycons.set("animated-icon", Skycons.RAIN);
      break;
    case "sunny":
      skycons.set("animated-icon", Skycons.CLEAR_DAY);
      break;
    case "haze":
      skycons.set("animated-icon", Skycons.FOG);
      break;
    case "cloudy":
      skycons.set("animated-icon", Skycons.CLOUDY);
      break;
    case "snow":
      skycons.set("animated-icon", Skycons.SNOW);
      break;
    case "wind":
      skycons.set("animated-icon", Skycons.WIND);
      break;
    case "clear":
      skycons.set("animated-icon", Skycons.CLEAR_DAY);
      break;
    default:
      skycons.set("animated-icon", Skycons.CLEAR_DAY);
  }
}

//Button function that changes C to F, F to C.
function changeTemp() {
  if(tempType === 0) {
    //C to F equation
    temperature = temperature * (1.8) + 32;
    weather.innerHTML = description + " " + Math.floor(temperature) + "&#x2109";
    tempType = 1;
  }
  else if(tempType === 1) {
    //F to C equation
    temperature = (temperature - 32) * .5556;
    weather.innerHTML = description + " " + Math.floor(temperature) + "&#x2103";
    tempType = 0;
  }
}
