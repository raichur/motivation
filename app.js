// Define variables
var year = 31558464000, // Milliseconds in a year
    day = 86400000, // Milliseconds in a day
    hour = 3600000, // Milliseconds in an hour
    ageElement = document.getElementById("age"),
    hoursLeftTodayElement = document.getElementById("hoursLeftToday"),
    daysLeftThisWeek = document.getElementById("daysLeftThisWeek"),
    daysLeftThisMonth = document.getElementById("daysLeftThisMonth"),
    daysLeftThisYear = document.getElementById("daysLeftThisYear"),
    quoteText = document.getElementById("quoteText"),
    quoteAuthor = document.getElementById("quoteAuthor"),
    nameElement = document.getElementById("name"),
    currentDateElement = document.getElementById("currentDate"),
    currentTimeElement = document.getElementById("currentTime"),
    yearsToLive = document.getElementById("yearsToLive"),
    daysToLive = document.getElementById("daysToLive"),
    changeSettings = document.getElementById("changeSettings"),
    settings = document.getElementById("settings"),
    settingsWrapper = document.getElementById("settingsWrapper"),
    nickNameVal = document.getElementById("nickName"),
    sleepingTimeHourVal = document.getElementById("sleepingTimeHour"),
    sleepingTimeMinutesVal = document.getElementById("sleepingTimeMinutes"),
    yearOfBirthVal = document.getElementById("yearOfBirth"),
    monthOfBirthVal = document.getElementById("monthOfBirth"),
    dayOfBirthVal = document.getElementById("dayOfBirth"),
    form = document.querySelector('form');

// Current date
function currentDate(nowNew){
  var amOrPm = ' am',
  hours = nowNew.getHours();
  if(nowNew.getHours() >= 13){
    amOrPm = ' pm';
    hours = nowNew.getHours() - 12;
  }
  return hours + ":" + ("0" + nowNew.getMinutes()).slice(-2) + ":" + ("0" + nowNew.getSeconds()).slice(-2) + amOrPm;
}

// Current day
function currentDay(nowNew) {
  var monthNames = ["January", "February", "March",
  "April", "May", "June", "July", "August", "September",
  "October", "November", "December"],
  dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  currentDay = nowNew.getDay(),
  currentDate = nowNew.getDate(),
  currentMonth = nowNew.getMonth(),
  currentYear = nowNew.getFullYear();
  return '<span>' + dayNames[currentDay] + '</span>, ' + currentDate + " " + monthNames[currentMonth] + " " + currentYear;
}

// Calculate age
function calculateAge(yearOfBirth, monthOfBirth, dayOfBirth, now) {
  var myAge = now - (new Date(yearOfBirth, monthOfBirth, dayOfBirth));
  var ageString = (myAge / year).toString().substring(0, 11);
  ageString = ageString < 0 ? 0 : ageString;
  return ageString;
}

function calculateLifeExpectancy(age) {
  var expectancy = (82 - age).toString().substring(0, 11); // Average of 30k days (82 years)
  expectancy = expectancy < 0 ? 0 : expectancy;
  return expectancy;
}

// Calculate hours left today
function hoursLeftToday(sleepingTimeHours, sleepingTimeMinutes, nowNew) {
  var timeLeftToday = (new Date(nowNew.getFullYear(), nowNew.getMonth(), nowNew.getDate(), sleepingTimeHours + 12, sleepingTimeMinutes)).getTime() - nowNew.getTime();
  var timeLeftString = (timeLeftToday / hour).toString().substring(0, 7);
  timeLeftString = timeLeftString < 0 ? 0 : timeLeftString;
  return timeLeftString;
}

// Calculate days left this month
function daysLeftThisMonthFunc(nowNew) {
  var timeLeftThisMonth = (new Date(nowNew.getFullYear(), nowNew.getMonth() + 1, 1)) - nowNew.getTime();
  return (timeLeftThisMonth / day).toString().substring(0, 7);
}

// Calculate days left this year
function daysLeftThisYearFunc(nowNew) {
  var timeLeftThisYear = (new Date(nowNew.getFullYear() + 1, 0, 1).getTime()) - nowNew.getTime();
  return (timeLeftThisYear / day).toString().substring(0, 7);
}

// Get random quote from "quotes.json" file
function getJSON(url) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('get', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status == 200) {
        resolve(xhr.response);
      } else {
        reject(status);
      }
    };
    xhr.send();
  });
}

getJSON('quotes.json').then(function(data) {
  var randomQuote = data.quotes[Math.floor(Math.random()*data.quotes.length)];
  quoteText.innerHTML = randomQuote.quote;
  quoteAuthor.innerHTML = randomQuote.author;
});

function addComma(number) {
  var splitByDot = number.toString().split('.'); // Split (Do not need commas in decimal places)
  splitByDot[0] = splitByDot[0].replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Fancy regex
  return splitByDot.join("."); // Reconnect
}

// setInterval and simple DOM manipulation stuff
setInterval(function getStuff(){
  var now = Date.now(),
  nowNew = new Date();
  var age = calculateAge(yearOfBirth, monthOfBirth, dayOfBirth, now);
  ageElement.innerHTML = age;
  hoursLeftTodayElement.innerHTML = hoursLeftToday(sleepingTimeHours, sleepingTimeMinutes, nowNew);
  daysLeftThisMonth.innerHTML = daysLeftThisMonthFunc(nowNew);
  daysLeftThisYear.innerHTML = daysLeftThisYearFunc(nowNew);
  currentDateElement.innerHTML = currentDay(nowNew);
  currentTimeElement.innerHTML = currentDate(nowNew);
  yearsToLive.innerHTML = calculateLifeExpectancy(age);
  daysToLive.innerHTML = addComma(calculateLifeExpectancy(age)*365.25).toString().substring(0, 12);
}, 100);
