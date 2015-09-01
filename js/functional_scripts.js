$(document).ready(function() {

  var position = new Object();
  // GETTING LOCATION OF THE USER
  position = getLocation();
  // SETING FORECAST API KEY AND URL
  var forecastKey = "f766966e845884aff1568f1c702f7b3d";
  var forecastUrl = "https://api.forecast.io/forecast/"+forecastKey+"/"+position.lat+","+position.lon;
  // MAKING THE FORECAST CALL
  var forecastData = forecast(forecastUrl);
  // PARSING DATA
  timezone = forecastData.timezone;
  offset = forecastData.offset;
  // CURRENT WEATHER DATA
  cur_time = forecastData.currently.time;
  cur_summary = forecastData.currently.summary;
  cur_icon = forecastData.currently.icon;
  cur_precip_intensity = forecastData.currently.precipIntesity;
  cur_precip_probability = forecastData.currently.precipProbability;
  cur_temp = forecastData.currently.temperature;
  cur_apparent_temp = forecastData.currently.apparentTemperature;
  cur_dew_point = forecastData.currently.dewPoint;
  cur_humidity = forecastData.currently.humidity * 100;
  cur_wind_speed = forecastData.currently.windSpeed;
  cur_wind_bearing = forecastData.currently.windBearing;
  cur_cloud_cover = forecastData.currently.cloudCover * 100;
  cur_pressure = forecastData.currently.pressure;
  cur_ozone = forecastData.currently.ozone;

  $('#cur_time').html(cur_time);
  $('#cur_summary').html(cur_summary);
  $('#cur_icon').addClass('wi-forecast-io-'+cur_icon);
  $('#cur_precip_intensity').html(cur_precip_intensity);
  $('#cur_precip_probability').html(cur_precip_probability);
  $('#cur_temp').html(cur_temp);
  $('#cur_apparent_temp').html(cur_apparent_temp);
  $('#cur_dew_point').html(cur_dew_point);
  $('#cur_humidity').html(cur_humidity);
  $('#cur_wind_speed').html(cur_wind_speed);
  $('#cur_wind_bearing').html(cur_wind_bearing);
  $('#cur_cloud_cover').html(cur_cloud_cover);
  $('#cur_pressure').html(cur_pressure);
  $('#cur_ozone').html(cur_ozone);

  // CALCULATING DAY AND HOUR
  var time = calcTime(cur_time*1000);
  $('#time').html(time.week_day + " " + time.hour + " " + time.ampm);

  // NEXT HOURS WEATHER DATA
  hours_summary = forecastData.hourly.summary;
  hours_icon = forecastData.hourly.icon;
  // for (i=0; i<forecastData.hourly.data; i++) {
  //   hour_time[i] = forecastData.hourly.data[i].time;
  //   hour_summary[i] = forecastData.hourly.data[i].summary;
  //   hour_icon[i] = forecastData.hourly.data[i].icon;
  //   hour_precip_intensity[i] = forecastData.hourly.data[i].precipIntesity;
  //   hour_precip_probability[i] = forecastData.hourly.data[i].precipProbability;
  //   hour_temp[i] = forecastData.hourly.data[i].temperature;
  //   hour_apparent_temp[i] = forecastData.hourly.data[i].apparentTemperature;
  //   hour_dew_point[i] = forecastData.hourly.data[i].dewPoint;
  //   hour_humidity[i] = forecastData.hourly.data[i].humidity;
  //   hour_wind_speed[i] = forecastData.hourly.data[i].windSpeed;
  //   hour_wind_bearing[i] = forecastData.hourly.data[i].windBearing;
  //   hour_cloud_cover[i] = forecastData.hourly.data[i].cloudCover;
  //   hour_pressure[i] = forecastData.hourly.data[i].pressure;
  //   hour_ozone[i] = forecastData.hourly.data[i].ozone;
  // }

  $('#hours_summary').html(hours_summary);
  $('#hours_icon').addClass('wi-forecast-io-'+hours_icon);

  // NEXT DAYS WEATHER DATA
  days_summary = forecastData.daily.summary;
  days_icon = forecastData.daily.icon;
  for (i=0; i<forecastData.hourly.data; i++) {
  //   day_time[i] = forecastData.daily.data[i].time;
  //   day_summary[i] = forecastData.daily.data[i].summary;
  //   day_icon[i] = forecastData.daily.data[i].icon;
    day_sunrise_time[i] = forecastData.daily.data[i].sunriseTime;
    day_sunset_time[i] = forecastData.daily.data[i].sunsetTime;
    day_moon_phase[i] = forecastData.daily.data[i].moonPhase;
  //   day_precip_intensity[i] = forecastData.daily.data[i].precipIntesity;
  //   day_precip_intensity_max[i] = forecastData.daily.data[i].precipIntesityMax;
  //   day_precip_intensity_max_time[i] = forecastData.daily.data[i].precipIntesityMaxTime;
  //   day_precip_probability[i] = forecastData.daily.data[i].precipProbability;
  //   day_precip_type[i] = forecastData.daily.data[i].precipType;
    day_temp_min[i] = forecastData.daily.data[i].temperatureMin;
    day_temp_min_time[i] = forecastData.daily.data[i].temperatureMinTime;
    day_temp_max[i] = forecastData.daily.data[i].temperatureMax;
    day_temp_max_time[i] = forecastData.daily.data[i].temperatureMaxTime;
  //   day_apparent_temp_min[i] = forecastData.daily.data[i].apparentTemperatureMin;
  //   day_apparent_temp_min_time[i] = forecastData.daily.data[i].apparentTemperatureMinTime;
  //   day_apparent_temp_max[i] = forecastData.daily.data[i].apparentTemperatureMax;
  //   day_apparent_temp_max_time[i] = forecastData.daily.data[i].apparentTemperatureMaxTime;
  //   day_dew_point[i] = forecastData.daily.data[i].dewPoint;
  //   day_humidity[i] = forecastData.daily.data[i].humidity;
  //   day_wind_speed[i] = forecastData.daily.data[i].windSpeed;
  //   day_wind_bearing[i] = forecastData.daily.data[i].windBearing;
  //   day_cloud_cover[i] = forecastData.daily.data[i].cloudCover;
  //   day_pressure[i] = forecastData.daily.data[i].pressure;
  //   day_ozone[i] = forecastData.daily.data[i].ozone;
  }

  $('#days_summary').html(days_summary);
  $('#days_icon').addClass('wi-forecast-io-'+days_icon);

  // REVERSE GEOCODING
  var reverseGeoUrl = "http://nominatim.openstreetmap.org/reverse?format=json&lat="+position.lat+"&lon="+position.lon+"&zoom=18&addressdetails=1";
  var address = reverseGeo(reverseGeoUrl);
  $('#city').html(address.city);
  $('#state').html(address.state);
  $('#country').html(address.country);

})
