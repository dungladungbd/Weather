var lat = 0;
var lon = 0;
var timeee = 0;
const apiURL = "http://api.openweathermap.org/data/2.5/weather?q=";
const apiKey = "&appid=b11149c6eb203b39d0dd88f337b6bb1d";
const appId = '051a355de07a390b85fc206f36202cca';
function searchCoord(apiURL, apiKey, searchTerm) {
    sendGetRequest(`${apiURL}${searchTerm}${apiKey}`, function (responseData1) {
        var coord = responseData1['coord'];
        lat = coord['lat'];
        lon = coord['lon'];
    })
}
function getTime(searchTime) {
    if (searchTime == '') {
        var d = new Date();
        timeee = d.getTime()
    }
}


function searchWeather() {
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
    searchCoord(apiURL, apiKey, searchTerm);
    getTime(searchTime);
    searchWeather();
});









