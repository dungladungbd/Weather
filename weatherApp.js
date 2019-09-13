var lat = 0;
var lon = 0;
var timeee = 0;
const apiURL = "http://api.openweathermap.org/data/2.5/weather?q=";
const apiKey = "&appid=b11149c6eb203b39d0dd88f337b6bb1d";
const appId = '051a355de07a390b85fc206f36202cca';
function searchCoord(apiURL, apiKey, searchTerm) {
    sendGetRequest(`${apiURL}${searchTerm}${apiKey}`, function (responseData1) {
        var coord = responseData1["coord"];
        lat = coord["lat"];
        lon = coord["lon"];
    })
}


function getTime(searchTime) {
    if (searchTime == '') {
        var d = new Date();
        k = d.getTime();
        timeee = k/1000;
    }
    else {
        var day = searchTime.substring(0, 2);
        var month = searchTime.substring(3, 5);
        var year = searchTime.substring(6, 10);
        var x = new Date(`${month} ${day} ${year}`);
        var h = x.getTime();
        timeee = h/1000;
    }
}


function searchWeather(appId,lat,lon,timeee) {
    sendGetRequest(`https://api.darksky.net/forecast/${appId}/${lat},${lon},${timeee}`, function (responseData2) {
        var currently = responseData2['currently'];
        var timezone = responseData2['timezone'];
        var icon_currently = currently['icon'];
        var summary_currently = currently['summary'];
        var temperature = currently['temperature'];
        var apparentTemp = currently['apparentTemperature'];
        console.log(timezone);
        console.log(icon_currently);
        console.log(summary_currently);
        console.log(temperature);
        console.log(apparentTemp);
    })
}

document.getElementById('searchBtn').addEventListener('click', function () {
    var searchTerm = document.getElementById('searchInput').value;
    var searchTime = document.getElementById('searchTime').value;
    searchCoord(apiURL, apiKey, searchTerm).then();
    getTime(searchTime);
    searchWeather(appId,lat,lon,timeee);
});









