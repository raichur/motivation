// Define variables
var year = 31558464000, // Milliseconds in a year
    day = 86400000, // Milliseconds in a day
    hour = 3600000, // Milliseconds in an hour
    ageElement = document.getElementById("age"), // Grab age element
    hoursLeftTodayElement = document.getElementById("hoursLeftToday"), // Grab hoursLeftToday element
    daysLeftThisMonth = document.getElementById("daysLeftThisMonth"), // Grab daysLeftThisMonth element
    daysLeftThisYear = document.getElementById("daysLeftThisYear"), // Grab daysLeftThisYear element
    githubRepos = document.getElementById("githubRepos"), // Grab githubRepos element
    quoteText = document.getElementById("quoteText"), // Grab quoteText element
    quoteAuthor = document.getElementById("quoteAuthor"), // Grab quoteAuthor element
    nameElement = document.getElementById("name"); // Grab nameElement element


// Calculate age
function calculateAge(yearOfBirth, monthOfBirth, dayOfBirth, now) {
  var myAge = now - (new Date(yearOfBirth, monthOfBirth, dayOfBirth));
  return (myAge / year).toString().substring(0, 14);
}

// Calculate hours left today
function hoursLeftToday(sleepingTimeHours, sleepingTimeMinutes, nowNew) {
  var timeLeftToday = (new Date(nowNew.getFullYear(), nowNew.getMonth(), nowNew.getDate(), sleepingTimeHours + 12, sleepingTimeMinutes)).getTime() - nowNew.getTime();
  return (timeLeftToday / hour).toString().substring(0, 8);
}

// Calculate days left this month
function daysLeftThisMonthFunc(nowNew) {
  var timeLeftThisMonth = (new Date(nowNew.getFullYear(), nowNew.getMonth() + 1, 0)) - nowNew.getTime();
  return (timeLeftThisMonth / day).toString().substring(0, 8);
}

// Calculate days left this year
function daysLeftThisYearFunc(nowNew) {
  var timeLeftThisYear = (new Date(nowNew.getFullYear() + 1, 0, 0).getTime()) - nowNew.getTime();
  return (timeLeftThisYear / day).toString().substring(0, 8);
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

  ageElement.innerHTML = calculateAge(yearOfBirth, monthOfBirth, dayOfBirth, now);
  hoursLeftTodayElement.innerHTML = hoursLeftToday(sleepingTimeHours, sleepingTimeMinutes, nowNew);
  daysLeftThisMonth.innerHTML = daysLeftThisMonthFunc(nowNew);
  daysLeftThisYear.innerHTML = daysLeftThisYearFunc(nowNew);
}, 100);

if(githubUsername.length >= 2) {
  getRepoCount(githubUsername);
}
