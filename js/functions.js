// HTML5 GEOLOCATION API
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(latLong);
  } else {
    // if the browser does not support it
    errorMessage = "Ooops, apparently your browser does not support geolocation so I can't give you the weather info about your location. Sorry about that";
    return errorMessage;
  }
}

// GRABING THE GEOLOCATION DATA
function latLong(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
}

// forecast.io API CALL AND DATA PARSING
function forecast(apiUrl) {
  $.ajax({
    url: apiUrl,
    dataType: 'jsonp',
    success: function(forecastDataParse) {
      timezone = forecastDataParse.timezone;
      offset = forecastDataParse.offset;
      cur_time = forecastDataParse.currently.time;
      cur_summary = forecastDataParse.currently.summary;
      cur_icon = forecastDataParse.currently.icon;
      cur_precip_intensity = forecastDataParse.currently.precipIntesity;
      cur_precip_probability = forecastDataParse.currently.precipProbability;
      cur_temp = forecastDataParse.currently.temperature;
      cur_apparent_temp = forecastDataParse.currently.apparentTemperature;
      cur_dew_point = forecastDataParse.currently.dewPoint;
      cur_humidity = forecastDataParse.currently.humidity;
      cur_wind_speed = forecastDataParse.currently.windSpeed;
      cur_wind_bearing = forecastDataParse.currently.windBearing;
      cur_cloud_cover = forecastDataParse.currently.cloudCover;
      cur_pressure = forecastDataParse.currently.pressure;
      cur_ozone = forecastDataParse.currently.ozone;
      hours_summary = forecastDataParse.hourly.summary;
      hours_icon = forecastDataParse.hourly.icon;
      for (i=0; i<forecastDataParse.hourly.data; i++) {
        hour_time[i] = forecastDataParse.hourly.data[i].time;
        hour_summary[i] = forecastDataParse.hourly.data[i].summary;
        hour_icon[i] = forecastDataParse.hourly.data[i].icon;
        hour_precip_intensity[i] = forecastDataParse.hourly.data[i].precipIntesity;
        hour_precip_probability[i] = forecastDataParse.hourly.data[i].precipProbability;
        hour_temp[i] = forecastDataParse.hourly.data[i].temperature;
        hour_apparent_temp[i] = forecastDataParse.hourly.data[i].apparentTemperature;
        hour_dew_point[i] = forecastDataParse.hourly.data[i].dewPoint;
        hour_humidity[i] = forecastDataParse.hourly.data[i].humidity;
        hour_wind_speed[i] = forecastDataParse.hourly.data[i].windSpeed;
        hour_wind_bearing[i] = forecastDataParse.hourly.data[i].windBearing;
        hour_cloud_cover[i] = forecastDataParse.hourly.data[i].cloudCover;
        hour_pressure[i] = forecastDataParse.hourly.data[i].pressure;
        hour_ozone[i] = forecastDataParse.hourly.data[i].ozone;
      }
      days_summary = forecastDataParse.daily.summary;
      days_icon = forecastDataParse.daily.icon;
      for (i=0; i<forecastDataParse.hourly.data; i++) {
        day_time[i] = forecastDataParse.daily.data[i].time;
        day_summary[i] = forecastDataParse.daily.data[i].summary;
        day_icon[i] = forecastDataParse.daily.data[i].icon;
        day_sunrise_time[i] = forecastDataParse.daily.data[i].sunriseTime;
        day_sunset_time[i] = forecastDataParse.daily.data[i].sunsetTime;
        day_moon_phase[i] = forecastDataParse.daily.data[i].moonPhase;
        day_precip_intensity[i] = forecastDataParse.daily.data[i].precipIntesity;
        day_precip_intensity_max[i] = forecastDataParse.daily.data[i].precipIntesityMax;
        day_precip_intensity_max_time[i] = forecastDataParse.daily.data[i].precipIntesityMaxTime;
        day_precip_probability[i] = forecastDataParse.daily.data[i].precipProbability;
        day_precip_type[i] = forecastDataParse.daily.data[i].precipType;
        day_temp_min[i] = forecastDataParse.daily.data[i].temperatureMin;
        day_temp_min_time[i] = forecastDataParse.daily.data[i].temperatureMinTime;
        day_temp_max[i] = forecastDataParse.daily.data[i].temperatureMax;
        day_temp_max_time[i] = forecastDataParse.daily.data[i].temperatureMaxTime;
        day_apparent_temp_min[i] = forecastDataParse.daily.data[i].apparentTemperatureMin;
        day_apparent_temp_min_time[i] = forecastDataParse.daily.data[i].apparentTemperatureMinTime;
        day_apparent_temp_max[i] = forecastDataParse.daily.data[i].apparentTemperatureMax;
        day_apparent_temp_max_time[i] = forecastDataParse.daily.data[i].apparentTemperatureMaxTime;
        day_dew_point[i] = forecastDataParse.daily.data[i].dewPoint;
        day_humidity[i] = forecastDataParse.daily.data[i].humidity;
        day_wind_speed[i] = forecastDataParse.daily.data[i].windSpeed;
        day_wind_bearing[i] = forecastDataParse.daily.data[i].windBearing;
        day_cloud_cover[i] = forecastDataParse.daily.data[i].cloudCover;
        day_pressure[i] = forecastDataParse.daily.data[i].pressure;
        day_ozone[i] = forecastDataParse.daily.data[i].ozone;
      }
    }
  });
}

  // DATE AND TIME CALC
  function calcTime() {
    d = new Date();
    hour = d.getHours().toString().length == 1 ? '0'+d.getHours() : d.getHours();
    ampm = d.getHours() >= 12 ? 'pm' : 'am';
    days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    $('#time').html(days[d.getDay()]+', '+hour%12+' '+ampm.toUpperCase())
  }

  // REVERSE GEOCODE API CALL
  function reverseGeo(apiUrl) {
    $.ajax({
      url: apiUrl,
      dataType: 'json',
      success: function(data) {
        user_city = data.address.city;
        user_state = data.address.state;
        user_country = data.address.country;
      }
    });
  }

}
