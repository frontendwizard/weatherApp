$(document).ready(function() {
  var units = '';
  var temp_unit = 'ºF';

  $('#us').click(function() {
    units = 'us';
    $('#units_choice').fadeOut();
    getWeatherData();
    $('.unit').html(temp_unit);
  });

  $('#si').click(function() {
    units = 'si';
    $('#units_choice').fadeOut();
    getWeatherData();
    temp_unit = 'ºC';
    $('.unit').html(temp_unit);
  });

  function getWeatherData() {
    // GETTING LOCATION OF THE USER
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(usePosition);
    } else {
      // if the browser does not support it
      var errorMessage = "Ooops, apparently your browser does not support geolocation so I can't give you the weather info about your location. Sorry about that";
      return errorMessage;
    }

    function usePosition(geolocation) {
      var latitude = geolocation.coords.latitude;
      var longitude = geolocation.coords.longitude;

      // SETING FORECAST API KEY AND URL
      var forecastKey = "f766966e845884aff1568f1c702f7b3d";
      var forecastUrl = "https://api.forecast.io/forecast/"+forecastKey+"/"+latitude+","+longitude+"?units="+units;
      // MAKING THE FORECAST CALL
      $.ajax({
        url: forecastUrl,
        dataType: 'jsonp',
        success: function(forecastDataParse) {
          // TIMEZONE DATA
          timezone = forecastDataParse.timezone;
          offset = forecastDataParse.offset;
          // CURRENT WEATHER DATA
          cur_time = forecastDataParse.currently.time;
          cur_summary = forecastDataParse.currently.summary;
          cur_icon = forecastDataParse.currently.icon;
          cur_precip_intensity = forecastDataParse.currently.precipIntesity;
          cur_precip_probability = Math.round(forecastDataParse.currently.precipProbability) + " %";
          cur_temp = Math.round(forecastDataParse.currently.temperature);
          cur_apparent_temp = forecastDataParse.currently.apparentTemperature;
          cur_dew_point = forecastDataParse.currently.dewPoint;
          cur_humidity = Math.round(forecastDataParse.currently.humidity * 100) + " %";
          cur_wind_speed = forecastDataParse.currently.windSpeed + " m/s";
          cur_wind_bearing = forecastDataParse.currently.windBearing + " Deg";
          cur_cloud_cover = forecastDataParse.currently.cloudCover * 100 + " %";
          cur_pressure = forecastDataParse.currently.pressure;
          cur_ozone = forecastDataParse.currently.ozone;

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
          $('.bg-image').css('background-image', 'url(images/bg/'+cur_icon+'.png)')
          if (cur_icon === 'clear-day') {
            $('.bg-color').css('background-color', '#f39c12');
          } else if (cur_icon === 'clear-night') {
            $('.bg-color').css('background-color', '#2c3e50');
          } else if (cur_icon === 'rain') {
            $('.bg-color').css('background-color', '#2980b9');
          } else if (cur_icon === 'snow') {
            $('.bg-color').css('background-color', 'snow');
            $('body').css('color', '#333');
            $('h1, small, #time').css('color', '#eaeaea');
            $('h1, #time').css('background-color', 'rgba(0,0,0,0.8)');
            $('h1, #time').css('padding', '10px');
          } else if (cur_icon === 'sleet') {
            $('.bg-color').css('background-color', '#ecf0f1');
            $('.bg-color, h1, small, #time').css('color', '#333');
          } else if (cur_icon === 'wind') {
            $('.bg-color').css('background-color', '#bdc3c7');
            $('.bg-color').css('color', '#555');
            $('h1, small, #time').css('color', '#2c3e50');
          } else if (cur_icon === 'fog') {
            $('.bg-color').css('background-color', '#bdc3c7');
            $('.bg-color').css('color', '#555');
          } else if (cur_icon === 'cloudy') {
            $('.bg-color').css('background-color', '#bdc3c7');
            $('.bg-color').css('color', '#555');
            $('#cur_icon').css('top', '20px');
          } else if (cur_icon === 'partly-cloudy-day') {
            $('.bg-color').css('background-color', '#2980b9');
            $('.bg-color').css('color', '#ecf0f1');
            $('body').css('color', '#2c3e50');
            $('small').css('color', '#2c3e50');
          } else if (cur_icon === 'partly-cloudy-night') {
            $('.bg-color').css('background-color', '#34495e');
          } else if (cur_icon === 'hail') {
            $('.bg-color').css('background-color', '#bdc3c7');
          } else if (cur_icon === 'thunderstorm') {
            $('.bg-color').css('background-color', '#7f8c8d');
          } else if (cur_icon === 'tornado') {
            $('.bg-color').css('background-color', '#7f8c8d');
          }

          // CALCULATING THE TIME AND OUTPUTTING INTO #time
          var d = new Date(cur_time*1000);
          var hour = d.getHours().toString().length == 1 ? '0'+d.getHours() : d.getHours();
          var ampm = d.getHours() >= 12 ? 'pm' : 'am';
          var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
          $('#time').html(days[d.getDay()]+', '+hour%12+' '+ampm.toUpperCase());

          // NEXT HOURS WEATHER DATA
          hours_summary = forecastDataParse.hourly.summary;
          hours_icon = forecastDataParse.hourly.icon;
          // for (i=0; i<forecastDataParse.hourly.data; i++) {
          //   hour_time[i] = forecastDataParse.hourly.data[i].time;
          //   hour_summary[i] = forecastDataParse.hourly.data[i].summary;
          //   hour_icon[i] = forecastDataParse.hourly.data[i].icon;
          //   hour_precip_intensity[i] = forecastDataParse.hourly.data[i].precipIntesity;
          //   hour_precip_probability[i] = forecastDataParse.hourly.data[i].precipProbability;
          //   hour_temp[i] = forecastDataParse.hourly.data[i].temperature;
          //   hour_apparent_temp[i] = forecastDataParse.hourly.data[i].apparentTemperature;
          //   hour_dew_point[i] = forecastDataParse.hourly.data[i].dewPoint;
          //   hour_humidity[i] = forecastDataParse.hourly.data[i].humidity;
          //   hour_wind_speed[i] = forecastDataParse.hourly.data[i].windSpeed;
          //   hour_wind_bearing[i] = forecastDataParse.hourly.data[i].windBearing;
          //   hour_cloud_cover[i] = forecastDataParse.hourly.data[i].cloudCover;
          //   hour_pressure[i] = forecastDataParse.hourly.data[i].pressure;
          //   hour_ozone[i] = forecastDataParse.hourly.data[i].ozone;
          // }

          $('#hours_summary').html(hours_summary);
          $('#hours_icon').addClass('wi-forecast-io-'+hours_icon);

          // NEXT DAYS WEATHER DATA
          days_summary = forecastDataParse.daily.summary;
          days_icon = forecastDataParse.daily.icon;
          day_temp_max = Math.round(forecastDataParse.daily.data[0].temperatureMax);
          day_temp_min = Math.round(forecastDataParse.daily.data[0].temperatureMin);

          // for (i=0; i<forecastDataParse.hourly.data; i++) {
          //   day_time[i] = forecastDataParse.daily.data[i].time;
          //   day_summary[i] = forecastDataParse.daily.data[i].summary;
          //   day_icon[i] = forecastDataParse.daily.data[i].icon;
          //   day_sunrise_time[i] = forecastDataParse.daily.data[i].sunriseTime;
          //   day_sunset_time[i] = forecastDataParse.daily.data[i].sunsetTime;
          //   day_moon_phase[i] = forecastDataParse.daily.data[i].moonPhase;
          // //   day_precip_intensity[i] = forecastDataParse.daily.data[i].precipIntesity;
          // //   day_precip_intensity_max[i] = forecastDataParse.daily.data[i].precipIntesityMax;
          // //   day_precip_intensity_max_time[i] = forecastDataParse.daily.data[i].precipIntesityMaxTime;
          // //   day_precip_probability[i] = forecastDataParse.daily.data[i].precipProbability;
          // //   day_precip_type[i] = forecastDataParse.daily.data[i].precipType;
          //   day_temp_min[i] = forecastDataParse.daily.data[i].temperatureMin;
          // //   day_temp_min_time[i] = forecastDataParse.daily.data[i].temperatureMinTime;
          //   day_temp_max[i] = forecastDataParse.daily.data[i].temperatureMax;
          // //   day_temp_max_time[i] = forecastDataParse.daily.data[i].temperatureMaxTime;
          // //   day_apparent_temp_min[i] = forecastDataParse.daily.data[i].apparentTemperatureMin;
          // //   day_apparent_temp_min_time[i] = forecastDataParse.daily.data[i].apparentTemperatureMinTime;
          // //   day_apparent_temp_max[i] = forecastDataParse.daily.data[i].apparentTemperatureMax;
          // //   day_apparent_temp_max_time[i] = forecastDataParse.daily.data[i].apparentTemperatureMaxTime;
          // //   day_dew_point[i] = forecastDataParse.daily.data[i].dewPoint;
          // //   day_humidity[i] = forecastDataParse.daily.data[i].humidity;
          // //   day_wind_speed[i] = forecastDataParse.daily.data[i].windSpeed;
          // //   day_wind_bearing[i] = forecastDataParse.daily.data[i].windBearing;
          // //   day_cloud_cover[i] = forecastDataParse.daily.data[i].cloudCover;
          // //   day_pressure[i] = forecastDataParse.daily.data[i].pressure;
          // //   day_ozone[i] = forecastDataParse.daily.data[i].ozone;
          // }

          $('#days_summary').html(days_summary);
          $('#days_icon').addClass('wi-forecast-io-'+days_icon);
          $('#day_max').html(day_temp_max);
          $('#day_min').html(day_temp_min);
        }
      });

      // REVERSE GEOCODING
      var reverseGeoUrl = "http://nominatim.openstreetmap.org/reverse?format=json&lat="+latitude+"&lon="+longitude+"&zoom=18&addressdetails=1";
      $.ajax({
        url: reverseGeoUrl,
        dataType: 'json',
        success: function(data) {
          user_city = data.address.city;
          user_state = data.address.state;
          user_country = data.address.country;
          $('#city').html(user_city);
          $('#state').html(user_state);
          $('#country').html(user_country);
        }
      });
    }
  }

})
