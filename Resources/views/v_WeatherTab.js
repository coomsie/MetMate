// define the UI elements

///WEATHER VIEW

	function view_init_Today(win) {
	//
	// create base UI tab and root window
	Titanium.API.info("UI - create weather window");
	//
		win.backgroundColor = '#fff';
		win.backgroundGradient= {type:'linear', colors:['#000001','#6666'], startPoint:{x:0,y:0}, endPoint:{x:320,y:480}, backFillStart:false};
		win.title='';
		win.barColor="#215B6D";
		win.translucent=true;
	    win.orientationModes = [Titanium.UI.PORTRAIT]; 
	 
		///create refresh button
		win.refresh = Titanium.UI.createButton({
		systemButton:Titanium.UI.iPhone.SystemButton.REFRESH
		});
	
		//add refresh button iOS
		if (Ti.Platform.name === 'iPhone OS') {
		win.rightNavButton = win.refresh;
		}
		
		// add android specific tests
		if (Titanium.Platform.osname === 'android')
			var activity = Ti.Android.currentActivity;
			// Here is an example of creating the menu handlers in the window creation options.
			win.activity = {
					onCreateOptionsMenu : function(e) {
					var menu = e.menu;
				
					var m1 = menu.add({ title : 'refresh' });
					m1.addEventListener('click', function(e) {
						Ti.API.info("refresh button fired");
						refreshTemp();
					});
					} 
					}
		};	
		
	// create table view
	Titanium.API.info("UI - create weather tab");
	//
	function create_weatherTab(rows, win , data_forecast) {
	
	m.tableview.data=rows;
	
	//change title
	if(data_forecast !== null)
	win.title = data_forecast.location;
	
	// add table view to the window
	//if(win.tableview) //if exists
	//win.remove(m.tableview);
	win.add(m.tableview);
	}
	
	//create weather forecast for next days
	Titanium.API.info("UI - create forecast");
	//
	function create_WeatherForecast(data_forecast) {
		var rows=[];
		Ti.API.info('data_forecast_length' + data_forecast.days.length);
		for (d=1; d<data_forecast.days.length-1; d++) {
			var row = Ti.UI.createTableViewRow({height:'auto',backgroundColor:'#ffffff',touchEnabled:false,className:'forecastrows'});
	
			var t = '';
	
			var day = Ti.UI.createLabel({
				text: data_forecast.days[d].dow,
				textAlign:'left',
				left:50,
				top:2,
				width:200,
				height:'auto',
				touchEnabled: false,
				color: '#666666',
				font:{fontWeight:'bold',fontSize:25}
			});
			row.add(day);
	
			var date = Ti.UI.createLabel({
				text: data_forecast.days[d].date,
				textAlign:'right',
				right:5,
				color: '#666666',
				top:2,
				width:50,
				touchEnabled: false,
				height:'auto',
				font:{fontWeight:'bold',fontSize:13}
			});
			row.add(date);
	
			var i = Ti.UI.createImageView({
				image: lookupWeatherImage(data_forecast.days[d].forecastWord, true),
				top: 5,
				left: 5,
				width:40,
				height:40
			});
	
			var hightemp = Ti.UI.createLabel({
				text: data_forecast.days[d].max + 'ºc',
				color: 'white',
				backgroundColor:'red',
				textAlign:'center',
				left:100,
				width:40,
				borderRadius:5,
				borderColor:'#dddddd',
				height:20,
				top:35,
				font:{fontSize:15,fontStyle:'Helvetica'}
			});
			var hightemplbl = Ti.UI.createLabel({
				text: 'Max',
				textAlign:'left',
				left:50,
				width:'auto',
				height:20,
				top:35,
				touchEnabled: false,
				color: '#666666',
				font:{fontSize:15,fontStyle:'Helvetica'}
			});
			row.add(hightemplbl);
			row.add(hightemp);
	
			var lowtemp = Ti.UI.createLabel({
				text: data_forecast.days[d].min + 'ºc',
				color: 'white',
				backgroundColor:'#3399CC',
				textAlign:'center',
				left:220,
				width:40,
				borderRadius:5,
				touchEnabled: false,
				borderColor:'#dddddd',
				height:20,
				top:35,
				font:{fontSize:15,fontStyle:'Helvetica'}
			});
			var lowtemplbl = Ti.UI.createLabel({
				text: 'Min',
				textAlign:'left',
				left:180,
				width:'auto',
				height:20,
				top:35,
				touchEnabled: false,
				color: '#666666',
				font:{fontSize:15,fontStyle:'Helvetica'}
			});
			row.add(lowtemplbl);
			row.add(lowtemp);
	
			var dayforecastwords = Ti.UI.createLabel({
				text: data_forecast.days[d].forecast,
				color: '#666666',
				textAlign:'justify',
				left:50,
				height:'auto',
				top:55,
				font:{fontWeight:'italic',fontSize:16,fontStyle:'Helvetica'}
			});
			row.add(dayforecastwords);
	
			row.add(i);
	
			rows[d] = row;
			
		};
	
		return rows;
	}

	//. create the temp for today UI
	Titanium.API.info("UI - create weather temp");
	//
	function create_Row_weatherToday(data_todays) {
		var data_forecast = m.data_forecast;
		
		var row = Ti.UI.createTableViewRow({
			height:'auto',
			backgroundColor:'#dddddd',
			borderWidth:0,
			touchEnabled:false,
			className:'todayrow'
			});
	
		//create label objects
		var currenttemp = Ti.UI.createLabel({
			text: data_todays.threeHour.temp + 'ºc',
			textAlign:'left',
			left:5,
			top:0,
			width:'auto',
			height:'80',
			shadowColor:'white',
			touchEnabled: false,
			font:{fontSize:75},
			color:'black'
		});
		row.add(currenttemp);
	
		var date = Ti.UI.createLabel({
			text: 'Now',
			textAlign:'right',
			right:5,
			color: '#666666',
			top:0,
			width:'50',
			height:'20',
			touchEnabled: false,
			font:{fontWeight:'bold',fontSize:13}
		});
		row.add(date);
		
		//location label for android only
		// add android specific tests
		if (Titanium.Platform.osname === 'android')
		{
		var loc = Ti.UI.createLabel({
			text: data_forecast.location,
			textAlign:'left',
			left:2,
			color: '#215B6D',
			top:0,
			width:'200',
			height:'20',
			touchEnabled: false,
			font:{fontWeight:'bold',fontSize:13}
		});
		row.add(loc);
		}
		
		var i = Ti.UI.createImageView({
			image: lookupWeatherImage(data_forecast.days[0].forecastWord, false),
			top: 2,
			right:5,
			top:0,
			width:'128',
			height:'128'
		});
		row.add(i);
	
		var wind = Ti.UI.createLabel({
			text: '' + data_todays.threeHour.windDirection + ' ' + data_todays.threeHour.windSpeed + ' km/h' ,
			textAlign:'left',
			left:5,
			width:'auto',
			height:20,
			top:103,
			touchEnabled: false,
			color: '#666666',
			font:{fontSize:15,fontWeight:'bold',fontStyle:'Helvetica'}
		});
		row.add(wind);
		var hightemp = Ti.UI.createLabel({
			text: data_forecast.days[0].max + 'ºc',
			color: 'white',
			backgroundColor:'red',
			textAlign:'center',
			left:45,
			width:40,
			touchEnabled: false,
			borderRadius:5,
			borderColor:'white',
			height:20,
			top:85,
			font:{fontSize:15,fontStyle:'Helvetica'}
		});
		var hightemplbl = Ti.UI.createLabel({
			text: 'Max',
			textAlign:'left',
			left:5,
			width:'auto',
			height:20,
			top:85,
			touchEnabled: false,
			color: '#666666',
			font:{fontSize:15,fontStyle:'Helvetica'}
		});
		row.add(hightemplbl);
		row.add(hightemp);
	
		var lowtemp = Ti.UI.createLabel({
			text: data_forecast.days[0].min +'ºc',
			color: 'white',
			backgroundColor:'#3399CC',
			textAlign:'center',
			left:140,
			width:40,
			touchEnabled: false,
			borderRadius:5,
			borderColor:'white',
			height:20,
			top:85,
			font:{fontSize:15,fontStyle:'Helvetica'}
		});
		var lowtemplbl = Ti.UI.createLabel({
			text: 'Min',
			textAlign:'left',
			left:100,
			width:'auto',
			height:20,
			top:85,
			touchEnabled: false,
			color: '#666666',
			font:{fontSize:15,fontStyle:'Helvetica'}
		});
		row.add(lowtemplbl);
		row.add(lowtemp);
	
		var dayforecastwords = Ti.UI.createLabel({
			text: data_forecast.days[0].forecast ,
			color: '#666666',
			textAlign:'justify',
			left:5,
			height:'auto',
			zIndex:10,
			top:120,
			touchEnabled: false,
			font:{fontWeight:'italic',fontSize:16,fontStyle:'Helvetica'}
		});
		row.add(dayforecastwords);
	
		return row;
	};
 

// end of Today UI

