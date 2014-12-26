// Define variables
var year = 31558464000, // Milliseconds in a year
    day = 86400000, // Milliseconds in a day
    hour = 3600000, // Milliseconds in an hour
    ageElement = document.getElementById("age"),
    hoursLeftTodayElement = document.getElementById("hoursLeftToday"),
    daysLeftThisMonth = document.getElementById("daysLeftThisMonth"),
    daysLeftThisYear = document.getElementById("daysLeftThisYear"),
    githubRepos = document.getElementById("githubRepos"),
    quoteText = document.getElementById("quoteText"),
    quoteAuthor = document.getElementById("quoteAuthor"),
    nameElement = document.getElementById("name"),
    currentDateElement = document.getElementById("currentDate"),
    currentTimeElement = document.getElementById("currentTime"),
    yearsToLive = document.getElementById("yearsToLive");

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
  return dayNames[currentDay] + ', ' + currentDate + " " + monthNames[currentMonth]
  + " " + currentYear;
}

// Calculate age
function calculateAge(yearOfBirth, monthOfBirth, dayOfBirth, now) {
  var myAge = now - (new Date(yearOfBirth, monthOfBirth, dayOfBirth));
  return (myAge / year).toString().substring(0, 11);
}

function calculateLifeExpectancy(age) {
  return (71 - age).toString().substring(0, 11); // Life expectancy at birth (71.0 years world average) - http://en.wikipedia.org/wiki/List_of_countries_by_life_expectancy
}
// Calculate hours left today
function hoursLeftToday(sleepingTimeHours, sleepingTimeMinutes, nowNew) {
  var timeLeftToday = (new Date(nowNew.getFullYear(), nowNew.getMonth(), nowNew.getDate(), sleepingTimeHours + 12, sleepingTimeMinutes)).getTime() - nowNew.getTime();
  return (timeLeftToday / hour).toString().substring(0, 6);
}

// Calculate days left this month
function daysLeftThisMonthFunc(nowNew) {
  var timeLeftThisMonth = (new Date(nowNew.getFullYear(), nowNew.getMonth() + 1, 0)) - nowNew.getTime();
  return (timeLeftThisMonth / day).toString().substring(0, 6);
}

// Calculate days left this year
function daysLeftThisYearFunc(nowNew) {
  var timeLeftThisYear = (new Date(nowNew.getFullYear() + 1, 0, 0).getTime()) - nowNew.getTime();
  return (timeLeftThisYear / day).toString().substring(0, 6);
}

// Get total GitHub repos
function getRepoCount(githubUsername) {
  function printRepoCount() {
    var responseObj = JSON.parse(this.responseText);
    githubRepos.innerHTML = responseObj.public_repos + " repos";
  }
  var request = new XMLHttpRequest();
  request.onload = printRepoCount;
  request.open('get', 'https://api.github.com/users/' + githubUsername, true);
  request.send();
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
};

getJSON('quotes.json').then(function(data) {
  var randomQuote = data.quotes[Math.floor(Math.random()*data.quotes.length)];
  quoteText.innerHTML = randomQuote.quote;
  quoteAuthor.innerHTML = randomQuote.author;
});

// Change name of h1 tag
if(nickName.length >= 1) {
  nameElement.innerHTML = ', ' + nickName;
}


// setInterval and simple DOM manipulation stuff
setInterval(function getStuff(){
  var now = Date.now(),
  nowNew = new Date;
  var age = calculateAge(yearOfBirth, monthOfBirth, dayOfBirth, now);
  ageElement.innerHTML = age;
  hoursLeftTodayElement.innerHTML = hoursLeftToday(sleepingTimeHours, sleepingTimeMinutes, nowNew);
  daysLeftThisMonth.innerHTML = daysLeftThisMonthFunc(nowNew);
  daysLeftThisYear.innerHTML = daysLeftThisYearFunc(nowNew);
  currentDateElement.innerHTML = currentDay(nowNew);
  currentTimeElement.innerHTML = currentDate(nowNew);
  yearsToLive.innerHTML = calculateLifeExpectancy(age);
}, 100);

if(githubUsername.length >= 2) {
  getRepoCount(githubUsername);
}
