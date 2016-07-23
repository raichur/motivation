// Define variables
var year = 31536000000, // Milliseconds in a year
    day = 86400000, // Milliseconds in a day
    hour = 3600000, // Milliseconds in an hour
    ageElement = document.getElementById("age"),
    hoursLeftTodayElement = document.getElementById("hoursLeftToday"),
    quoteText = document.getElementById("quoteText"),
    quoteAuthor = document.getElementById("quoteAuthor"),
    currentDateElement = document.getElementById("currentDate"),
    currentTimeElement = document.getElementById("currentTime"),
    yearsToLive = document.getElementById("yearsToLive"),
    daysToLive = document.getElementById("daysToLive"),
    sleepingTimeHourVal = document.getElementById("sleepingTimeHour"),
    sleepingTimeMinutesVal = document.getElementById("sleepingTimeMinutes"),
    yearOfBirthVal = document.getElementById("yearOfBirth"),
    monthOfBirthVal = document.getElementById("monthOfBirth"),
    dayOfBirthVal = document.getElementById("dayOfBirth");

// Current date
function currentDate(nowNew){
  var amOrPm = ' AM',
  hours = nowNew.getHours();
  if(hours == "0") {
    hours = 12;
  }
  if(nowNew.getHours() >= 13){
    amOrPm = ' PM';
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
function calculateAge(birthday) {
  var now = new Date,
  duration = now - birthday,
  years = duration / 31556900000;
  var age = Number(years.toString().substring(0, 11)).toFixed(8);
  return age;
}

// Calculate life expectancy based on average
function calculateLifeExpectancy(age) {
  var expectancy = Number((82 - age).toString().substring(0, 11)).toFixed(8); // Average of 30k days (82 years)
  expectancy = expectancy < 0 ? 0 : expectancy;
  return expectancy;
}

// Calculate hours left today
function hoursLeftToday(sleepingTimeHours, sleepingTimeMinutes, nowNew) {
  var timeLeftToday = (new Date(nowNew.getFullYear(), nowNew.getMonth(), nowNew.getDate(), sleepingTimeHours + 12, sleepingTimeMinutes)).getTime() - nowNew.getTime();
  var timeLeftString = Number((timeLeftToday / hour).toString().substring(0, 7)).toFixed(4);
  timeLeftString = timeLeftString < 0 ? 0 : timeLeftString;
  return timeLeftString;
}

function addComma(number) {
  var splitByDot = number.toString().split('.'); // Split (Do not need commas in decimal places)
  splitByDot[0] = splitByDot[0].replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Fancy regex
  return splitByDot.join("."); // Reconnect
}

// setInterval and simple DOM manipulation stuff
setInterval(function getStuff(){
  var now = Date.now(),
  nowNew = new Date();
  var age = calculateAge(new Date(dateOfBirth));
  ageElement.innerHTML = age;
  hoursLeftTodayElement.innerHTML = hoursLeftToday(sleepingTimeHours, sleepingTimeMinutes, nowNew);
  currentDateElement.innerHTML = currentDay(nowNew);
  currentTimeElement.innerHTML = currentDate(nowNew);
  yearsToLive.innerHTML = calculateLifeExpectancy(age);
  daysToLive.innerHTML = addComma(calculateLifeExpectancy(age)*365.25).toString().substring(0, 12);
}, 100);
