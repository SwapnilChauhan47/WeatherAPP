// api key : 91cde6d834833ba67e6de9a0ded54cad
//sample method - api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={your api key}
//City Name - api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}



const iconElement = document.querySelector(".weather-icon");
const noftyElement = document.querySelector(".notification");
const tempElement = document.querySelector(".temperature-value p");
const tempDesElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location");
const searchElement = document.querySelector(".searchButton");

//App data

const weather ={}
weather.temperature = {
    unit : 'celcius'
}

//App constants
const KELVIN = 273;
const APIkey =  "91cde6d834833ba67e6de9a0ded54cad";

//check if browser supports geo location

if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition,showError)
}
else{
    noftyElement.style.disply = 'block';
    noftyElement.innerHTML = "<p> Your Browser Doesn't support Geolocation </p>"
}

//set users position

function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let API = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIkey}`
    getWeather(API);
}

//show erros if there any

function showError(error){
    noftyElement.style.disply ='block';
    noftyElement.innerHTML = `<p>${error.message} </p>`;
    console.log(error.message);
}

function cityName(){
    let city = document.getElementById('searchText').value
    let API = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}`
    getWeather(API)
    console.log(city)
}

//getting data from wheather API
function getWeather(API){
    console.log(API);

    fetch(API)
    .then(function(response){
        let data = response.json()
        return data;
    })
    .then(function(data){
        weather.temperature.value = Math.floor(data.main.temp - KELVIN);
        weather.description = data.weather[0].description;
        weather.iconId = data.weather[0].icon;
        weather.city = data.name;
        weather.country = data.sys.country;
    })
    .then(function(){
        displayWeather()
    });

}

//to display weather on screen
function displayWeather(){
    iconElement.innerHTML = `<img src="./icons/${weather.iconId}.png">`
    tempElement.innerHTML = `${weather.temperature.value}° <span>C</span>`
    tempDesElement.innerHTML = `${weather.description}`;
    locationElement.innerHTML = `${weather.city},${weather.country}`;
}

function celciusToFahrenheit(temperature){
    return (temperature * 9/5) + 32;
}

//when user clicks on temperature
tempElement.addEventListener('click',function(){
    if(weather.temperature.value === 'undefined')return;

    if(weather.temperature.unit === 'celcius'){
        let fahrenheit = celciusToFahrenheit(weather.temperature.value);
        tempElement.innerHTML = `${fahrenheit}° <span>F</span>`;
        weather.temperature.unit = 'fahrenheit';
    }
    else{
        tempElement.innerHTML = `${weather.temperature.value}° <span>C</span>`
        weather.temperature.unit = 'celcius';
    }
})
