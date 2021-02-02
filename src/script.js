function capitalizeEachWord(word) {
    let words = word.split(" ");
    for (var i=0;i < words.length; i++){
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
        // console.log(words[i]);
    }
    return words.join(' ');
}

function changeCelcius(){
    let temp = document.querySelector("#update-temp");
    temp.innerHTML = "7";
    } 
    
function changeFahr() {
    temp = document.querySelector("#update-temp");
    temp.innerHTML = "66";
    }

function displayWeather(response){
    currentTemp = Math.round(response.data.main.temp);
    console.log(`${currentTemp}°C`);
    let temp = document.querySelector('#update-temp');
    temp.innerHTML = `${currentTemp}`;
}

function getWeather(city,units="metric"){
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

  setDate();
  getWeather(newCity);
}

function setTime(){
    let date = new Date();

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

function setDate(){
    let currentDate = document.querySelector("#current-date");
    currentDate.innerHTML = setTime();
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

//set current date
setDate();

//watch for search
let city = document.querySelector("#search-form");
city.addEventListener("submit", searchCity);

//watch for click on °C or °F
let celciusLink = document.querySelector("#degree-celcius");
let fahrenheightLink = document.querySelector("#degree-fahr");

celciusLink.addEventListener("click",changeCelcius);
fahrenheightLink.addEventListener("click",changeFahr);






