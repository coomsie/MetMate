//get data
///http://metservice.com/publicData/localObs93781

	function getTodaysData(citycode)
	{
		Titanium.API.info("get todays data");
		var myresult;
		var xhr2 = Titanium.Network.createHTTPClient();
		xhr2.onload = function() {
			Ti.API.info('getting json for todays data');
			try{
			m.data_todays = JSON.parse(this.responseText);
			}
			catch(e){
				m.errorDialog.message = e.error;
				m.errorDialog.show();
			}
			Ti.API.info(m.data_todays);
			Ti.API.info(m.data_todays.threeHour.temp);
			getForecastData(m.userProfile.cityname);

		};
		xhr2.onerror = function(e) {
			Ti.API.error('error get todays highs:' + e.error);
			m.errorDialog.message = e.error;
			m.errorDialog.show();
		};
		xhr2.open("GET","http://metservice.com/publicData/localObs"+citycode);
		xhr2.send();
	};

	function getForecastData(cityname) 
	{
		Titanium.API.info("get forecast data ");
		var myresult;
		var xhr2 = Titanium.Network.createHTTPClient();
		xhr2.onload = function() {
			Ti.API.info('getting json for forecast data');
			try{
			m.data_forecast = JSON.parse(this.responseText);
			}
			catch(e){
				m.errorDialog.message = e.error;
				m.errorDialog.show();
			}
			
			
			Ti.API.info(m.data_forecast);
			Ti.API.info(m.data_forecast.days[0].max);
			create_WeatherTodayrow();
			create_WeatherTablerows();
			create_weatherTab(m.TableViewRows,win1,m.data_forecast);
			
			m.refresh= false;
			//load into prefs.
			setWeatherDataProperty();
		};
		xhr2.onerror = function(e) {
			Ti.API.error('error get todays highs:' + e.error);
			m.errorDialog.message = e.error;
			m.errorDialog.show();
		};
		xhr2.open("GET","http://metservice.com/publicData/localForecast" + cityname);
		xhr2.send();
	};
	
	function create_WeatherTodayrow()
	{
			//create UI
			
			//add refresh button iOS
			if (Ti.Platform.name === 'iPhone OS')
			m.TableViewRows.push(m.blankrow);
			m.TableViewRows.push(create_Row_weatherToday(m.data_todays));
	}
	
	function create_WeatherTablerows()
	{
		//create UI
			var fdata = create_WeatherForecast(m.data_forecast);
			for (rr=1;rr<fdata.length-1;rr++) {
				m.TableViewRows.push(fdata[rr]);
			}
	}

	function refreshTemp()
	{
		Ti.API.info('doing refresh with code:' + m.userProfile.cityname);
		m.TableViewRows=[];
		getTodaysData(m.userProfile.citycode);
				messageLabel.text = 'refreshing ...';
				messageWin.open();
				setTimeout(function()
				{
				messageWin.close({opacity:0,duration:1000});
				},2000);
		Ti.API.info('doing refresh with code:' + m.userProfile.citycode);
	};
	
	function setWeatherDataProperty()
	{
	// set props
	Ti.App.Properties.setString("data_todays", JSON.stringify(m.data_todays));
	Ti.App.Properties.setString("data_forecast", JSON.stringify(m.data_forecast));
	}
	
	function getWeatherDataProperty()
	{
	
	test = Ti.App.Properties.getString("data_todays");
	if(test===null)
	{
		return false;
	}else
	{
		// set props
		m.data_todays = JSON.parse(Ti.App.Properties.getString("data_todays"));
		Ti.API.info(m.data_todays);
		m.data_forecast = JSON.parse(Ti.App.Properties.getString("data_forecast"));
		return true;
	}
	}

/// lookup function for icons
	function lookupWeatherImage(_1c, _1d) {
		var _1e = "images/met/";
		if (_1d) {
			switch (_1c) {
				case "Cloudy":
					_1e += "cloudy_wht.gif";
					break;
				case "Drizzle":
					_1e += "drizzle_wht.gif";
					break;
				case "Fine":
					_1e += "fine_wht.gif";
					break;
				case "Fog":
					_1e += "fog_wht.gif";
					break;
				case "Fewshowers":
				case "Few showers":
					_1e += "few-showers_wht.gif";
					break;
				case "Hail":
					_1e += "hail_wht.gif";
					break;
				case "Partcloudy":
				case "Partly cloudy":
					_1e += "partly-cloudy_wht.gif";
					break;
				case "Rain":
					_1e += "rain_wht.gif";
					break;
				case "Showers":
					_1e += "showers_wht.gif";
					break;
				case "Snow":
					_1e += "snow_wht.gif";
					break;
				case "Thunder":
					_1e += "thunder_wht.gif";
					break;
				case "Wind":
				case "Windy":
					_1e += "wind_wht.gif";
					break;
				default:
					_1e += "unavailable_wht.gif";
			}
		} else {
			switch (_1c) {
				case "Cloudy":
					_1e += "BigIcon_Cloudy_clr.gif";
					break;
				case "Drizzle":
					_1e += "BigIcon_Drizzle_clr.gif";
					break;
				case "Fine":
					_1e += "BigIcon_Fine_clr.gif";
					break;
				case "Fog":
					_1e += "BigIcon_Fog_clr.gif";
					break;
				case "Fewshowers":
				case "Few showers":
					_1e += "BigIcon_Fewshowers_clr.gif";
					break;
				case "Hail":
					_1e += "BigIcon_Hail_clr.gif";
					break;
				case "Partcloudy":
				case "Partly cloudy":
					_1e += "BigIcon_Partcloudy_clr.gif";
					break;
				case "Rain":
					_1e += "BigIcon_Rain_clr.gif";
					break;
				case "Showers":
					_1e += "BigIcon_Rain_clr.gif";
					break;
				case "Snow":
					_1e += "BigIcon_Snow.gif";
					break;
				case "Thunder":
					_1e += "BigIcon_Thunder_clr.gif";
					break;
				case "Wind":
				case "Windy":
					_1e += "BigIcon_Wind_clr.gif";
					break;
				default:
					_1e += "BigIcon_unavailable_wht.gif";
			}
		}
		return _1e;
	};
	

//error handling

m.errorDialog.addEventListener('click', function() {
	var emailDialog = Titanium.UI.createEmailDialog();
    	emailDialog.setSubject('MetMate error');
    	emailDialog.setToRecipients(['coomsie@coomsie.com']);

    if (Ti.Platform.name == 'iPhone OS') {
        emailDialog.setMessageBody(m.errorDialog.message);
        emailDialog.setHtml(true);
        emailDialog.setBarColor('#336699');
    } else {
        emailDialog.setMessageBody(m.errorDialog.message);
    }

    // attach a file
    var f = Ti.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,Ti.App.guid + '.log');
    emailDialog.addAttachment(f);

    emailDialog.addEventListener('complete',function(e)
    {
        if (e.result == emailDialog.SENT)
        {
            if (Ti.Platform.osname !== 'android') {
                // android doesn't give us useful result codes.
                // it anyway shows a toast.
                ///alert("message was sent");
            }
        }
        else
        {
            alert("message was not sent. " + e.result);
        }
    });
    emailDialog.open();
});