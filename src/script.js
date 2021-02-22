function capitalizeEachWord(word) {
    let words = word.split(" ");
    for (var i=0;i < words.length; i++){
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
        // console.log(words[i]);
    }
    return words.join(' ');
}

function changeCelcius(event){
    event.preventDefault();
    let currentTemp = document.querySelector("#update-temp");

    currentTemp.innerHTML = Math.round(celciusTemperature);

    //remove the active class from celcius link
    celciusLink.classList.add("active");

    //add the active class to fahreinheight link
    fahrenheightLink.classList.remove("active");
    } 
    
function changeFahr(event) {
    event.preventDefault();
    let currentTemp = document.querySelector("#update-temp");

    //remove the active class from celcius link
    celciusLink.classList.remove("active");

    //add the active class to fahreinheight link
    fahrenheightLink.classList.add("active");

    let fahreinhrightTemp = (celciusTemperature * 9.0)/5.0 + 32.0;
    currentTemp.innerHTML = Math.round(fahreinhrightTemp);
    }

function displayWeather(response){
    
    console.log(response)
    currentTemp = Math.round(response.data.main.temp);

    //update global variable
    celciusTemperature = response.data.main.temp
    // console.log(`${currentTemp}°C`);
    let temp = document.querySelector('#update-temp');
    temp.innerHTML = `${currentTemp}`;

    
    let descriptionElement = document.querySelector('#description');
    descriptionElement.innerHTML = capitalizeEachWord(response.data.weather[0].description);

    setDateTime(response.data.dt * 1000);

    let humidity = document.querySelector('#humidity');
    humidity.innerHTML = `${response.data.main.humidity}%`;

    let wind = document.querySelector('#wind');
    wind.innerHTML = `${response.data.wind.speed} Km/h`

    let clouds = document.querySelector('#cloudCoverage')
    clouds.innerHTML = `${response.data.clouds.all}%`


    //Move this into new function
    let icon = response.data.weather[0].icon
    let iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`
    let currentWeatherIconElement = document.querySelector("#current-weather-icon")
    currentWeatherIconElement.setAttribute("src", iconURL)
    currentWeatherIconElement.setAttribute("alt", response.data.weather[0].description)
}

function getWeather(city, units="metric"){
    let apiKey = "d3f16bcc0a8b96aa710067cefafc5cfc";
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&&units=${units}`;
    
    axios.get(apiURL).then(displayWeather);
}

function searchCity(event) {
  event.preventDefault();
  let input = document.querySelector("#city-input");
  let newCity = capitalizeEachWord(input.value);
  let currentCity = document.querySelector("#city-name");
  currentCity.innerHTML = newCity;
  getWeather(newCity);
}

function getDateTimeString(timestamp){
    let date = new Date(timestamp);

    //get all the date time information
    let day = date.getDate();
    let weekDay = dayOfWeek[date.getDay()];
    let year = date.getFullYear();
    let month = monthofYear[date.getMonth()];
    // get the minutes and hours
    let minutes = date.getMinutes();
    let hours = date.getHours();

    //decide if am or pm
    let ampm = "";
    if (hours >= 12 ){
        ampm = "pm";
    } else {
        ampm = "am";
    }

    //change to 12 hour clock
    hours = hours % 12;
    let timeStr = `${weekDay}, ${month} ${day}, ${hours}:${minutes} ${ampm}.`

    return timeStr
}

function setDateTime(timestamp){
    let currentDate = document.querySelector("#current-date");
    currentDate.innerHTML = getDateTimeString(timestamp);
}

let dayOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let monthofYear = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

let celciusTemperature = null
//set current date
//setDate();

//watch for search
let city = document.querySelector("#search-form");
city.addEventListener("submit", searchCity);

//watch for click on °C or °F
let celciusLink = document.querySelector("#degree-celcius");
let fahrenheightLink = document.querySelector("#degree-fahr");

celciusLink.addEventListener("click",changeCelcius);
fahrenheightLink.addEventListener("click",changeFahr);






