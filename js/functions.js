// HTML5 GEOLOCATION API
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(latLong);
  } else {
    // if the browser does not support it
    var errorMessage = "Ooops, apparently your browser does not support geolocation so I can't give you the weather info about your location. Sorry about that";
    return errorMessage;
  }
}

// RETURNING THE GEOLOCATION DATA
function latLong(position) {
  position['lat'] = position.coords.latitude;
  position['lon'] = position.coords.longitude;
  return position;
}

// forecast.io API CALL AND DATA PARSING
function forecast(apiUrl) {
  $.ajax({
    url: apiUrl,
    dataType: 'jsonp',
    success: function(forecastData) {
      return forecastData;
    }
  });
}

// DATE AND TIME CALC
function calcTime(time) {
  var d = new Date(time);
  var hour = d.getHours().toString().length == 1 ? '0'+d.getHours() : d.getHours();
  var ampm = d.getHours() >= 12 ? 'pm' : 'am';
  var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  date['week_day'] = days[d.getDay()];
  date['hour'] = hour%12;
  date['ampm'] = ampm;
  return date;
}

// REVERSE GEOCODE API CALL
function reverseGeo(apiUrl) {
  $.ajax({
    url: apiUrl,
    dataType: 'json',
    success: function(data) {
      address['city'] = data.address.city;
      address['state'] = data.address.state;
      address['country'] = data.address.country;
      return address;
    }
  });
}
