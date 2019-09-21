const apiURL = "http://api.openweathermap.org/data/2.5/weather?q=";
const apiKey = "&appid=b11149c6eb203b39d0dd88f337b6bb1d";
let appId = 'b11149c6eb203b39d0dd88f337b6bb1d';
let units = 'metric';
let searchMethod;

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
        return result.json();
    }).then(result => {
        init(result);
    });
}

function init(resultFromServer) {

    let tempObj = resultFromServer;
    let forecast = [];

    for (var i = 0; i < tempObj.list.length; i += 8) {
        let d = tempObj.list[i].dt_txt;
        let weatherObj = {
            day: handleDate(d.toString()),
            icon: `http:openweathermap.org/img/wn/${tempObj.list[i].weather[0].icon}@2x.png`,
            temperature: (tempObj.list[i].main.temp - 273).toFixed(0),
            cityName: tempObj.city.name,

        };

        forecast.push(weatherObj);
    }

    putDataToHtml(forecast);
}

function handleDate(str) {
    let result = str.substr(0, 10);
    return result;
}

function putDataToHtml(forecastData) {

    const section = document.getElementById("container");
    document.getElementById('nameCity').textContent = forecastData[0].cityName;
    let weather = section.getElementsByClassName('weather');
    let date = document.getElementsByClassName('date');
    let temp = document.getElementsByClassName('temp');
    let imgs = document.getElementsByClassName('icon_img');

    for (let i = 0; i < forecastData.length; i++) {
        date[i].textContent = forecastData[i].day;
        temp[i].textContent = forecastData[i].temperature + "º";
        imgs[i].src = forecastData[i].icon;
    }

}

function onClicked() {
    let searchTerm = document.getElementById('searchInput').value;
    if (searchTerm) {
        searchWeather(searchTerm);
    }
}

document.getElementById('searchBtn').addEventListener('click', onClicked);