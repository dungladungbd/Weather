const apiURL = "http://api.openweathermap.org/data/2.5/weather?q=";
const apiKey = "&appid=b11149c6eb203b39d0dd88f337b6bb1d";
let appId = 'b11149c6eb203b39d0dd88f337b6bb1d';
let units = 'metric';
let searchMethod;
var resultApi;
var listDate;
var weatherContainer = document.getElementById("image_of_tab1");
var dailyWeather = weatherContainer.getElementsByClassName("weather");

var main;
var date;
var dateTXT;
var temp;
var humidity;
var icon;
var feature = [];

function getSearchMethod(searchTerm) {
    if (searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm) {
        searchMethod = 'zip';
    } else {
        searchMethod = 'q';
    }
}

function searchWeather(searchTerm) {
    getSearchMethod(searchTerm);
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${searchTerm}${apiKey}`).then(result => {
        console.log(`https://api.openweathermap.org/data/2.5/forecast?q=${searchTerm}${apiKey}`)
        resultApi = result;
        return result.json();
    }).then(result => {
        init(result);
    });
}

function init(resultFromServer) {
    var listDate = resultFromServer.list;
    for (var i = 3; i < 42; i += 8) {
        date = listDate[i];
        dateTXT = date.dt_txt;
        // console.log("Today's date:", dateTXT);
        main = date.main;
        temp = Math.round(main.temp - 273);
        //console.log("Temperature: ", temp);
        humidity = main.humidity;
        icon = listDate[1].weather[0].icon;
        description = listDate[1].weather[0].description;
        //console.log(`Humidity: ${humidity}%`)
        var obj = {
            'dt_txt': dateTXT,
            'temp': temp,
            'humidity': humidity,
            "icon": icon,
            "description": description,
            'img': `http://openweathermap.org/img/wn/${icon}@2x.png`
        };
        feature.push(obj)
    }
    for (var i = 0; i < 5; i++) {
        var dailyDate = dailyWeather[i].getElementsByClassName("date");
        var dailyTemp = dailyWeather[i].getElementsByClassName("temp");
        var dailyHumidity = dailyWeather[i].getElementsByClassName("humidity");
        var dailyDes = dailyWeather[i].getElementsByClassName('description');
        var dailyImg = dailyWeather[i].getElementsByClassName('icon_img');
        var dailyFeature = feature[i];

    }
}

document.getElementById('searchBtn').addEventListener('click', () => {
    let searchTerm = document.getElementById('searchInput').value;
    if (searchTerm) {
        searchWeather(searchTerm);
        console.log(feature);
    }
});


