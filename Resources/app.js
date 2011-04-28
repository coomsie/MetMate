Ti.API.info(Ti.App.guid);
//load models
Titanium.include('models/m_Weather.js');

// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#6666');

//Message windows
var messageWin = Titanium.UI.createWindow({
	height:30,
	width:250,
	bottom:70,
	borderRadius:10,
	touchEnabled:false,

	orientationModes : [
	Titanium.UI.PORTRAIT,
	Titanium.UI.UPSIDE_PORTRAIT,
	Titanium.UI.LANDSCAPE_LEFT,
	Titanium.UI.LANDSCAPE_RIGHT,
	]
});
var messageView = Titanium.UI.createView({
	id:'messageview',
	height:30,
	width:250,
	borderRadius:10,
	backgroundColor:'#000',
	opacity:0.7,
	touchEnabled:false
});

var messageLabel = Titanium.UI.createLabel({
	id:'messagelabel',
	text:'',
	color:'#fff',
	width:250,
	height:'auto',
	font:{
		fontFamily:'Helvetica Neue',
		fontSize:13
	},
	textAlign:'center'
});
messageWin.add(messageView);
messageWin.add(messageLabel);


// create tab group
var tabGroup = Titanium.UI.createTabGroup({
	barColor:'#3F7389',
	backgroundImage:'images/nav_bg.png',
	backgroundGradient:{type:'linear', colors:['#000001','#6666'], startPoint:{x:0,y:0}, endPoint:{x:320,y:480}, backFillStart:false}
});


// Weather Tab ///
var win1 = Titanium.UI.createWindow({id:'win1'});
var tab1 = Titanium.UI.createTab({
	icon:'star.png',
	title:'Weather',
	window:win1
});

var win = Titanium.UI.currentWindow;

// Load UI elements 
Titanium.include('views/v_WeatherTab.js');
view_init_Today(win1);
//load controllers
Titanium.include('controllers/ctr_WeatherTab.js');
 
 
//Radar tab ///
//create radar UI Tab
var win2 = Titanium.UI.createWindow({id:'win2'});
var tab2 = Titanium.UI.createTab({
	icon:'radar.png',
	title:'Radar',
	window:win2
});
// Load UI elements 
Titanium.include('views/v_RadarTab.js');
view_init_Radar(win2);
//load controllers
Titanium.include('controllers/ctr_RadarTab.js');


//3Day tab ///
//create radar UI Tab
var win3 = Titanium.UI.createWindow({id:'win3'});
var tab3 = Titanium.UI.createTab({
	icon:'radar.png',
	title:'Forecast',
	window:win3
});
// Load UI elements 
Titanium.include('views/v_3DayTab.js');
view_init_3Day(win3);
//load controllers
Titanium.include('controllers/ctr_3DayTab.js');

//Settings tab ///
//create radar UI Tab
var win4 = Titanium.UI.createWindow({id:'win4'});
var tab4 = Titanium.UI.createTab({
	icon:'settings.png',
	title:'Settings',
	window:win4
});
// Load UI elements 
Titanium.include('views/v_SettingsTab.js');
view_init_Settings(win4,m.Pickerdata);
//load controllers
Titanium.include('controllers/ctr_SettingsTab.js');

//
//  add tabs
//
tabGroup.addTab(tab1);
tabGroup.addTab(tab2);
tabGroup.addTab(tab3);
tabGroup.addTab(tab4);

tabGroup.setActiveTab(0);

// open tab group
tabGroup.open({
	transition:Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
});

//set listener for refresh button
win1.refresh.addEventListener('click', function(e)
{
	Ti.API.info("refresh button fired");
	//check if to weather and needs refresh.
   	refreshTemp();
});


//GET YESTERDAYS DATA
if (getWeatherDataProperty())
{
//LOAD DATA
create_WeatherTodayrow();
create_WeatherTablerows();
create_weatherTab(m.TableViewRows,win1,m.data_forecast)
		messageLabel.text = 'last updated ...' + m.data_todays.threeHour.dateTime;
		messageWin.open();
		setTimeout(function()
			{
				messageWin.close({opacity:0,duration:500});
			},2000);
		//get defaults if exists
		//get todays data
		if (getPrefs())
		{
			setTimeout(function()
			{
				refreshTemp();
			},3000);
		}
		else
		{
			Ti.API.info("opening tab 3");
			tabGroup.setActiveTab(3).open();
			
		}
};


//set listener for tab changes
// focus event listener for tracking tab changes
tabGroup.addEventListener('focus', function(e)
{
	Ti.API.info("tab 0 focus fired & prev index" + e.previousIndex);
	//check if to weather and needs refresh.
   if(e.index===0 && e.previousIndex!=0 && e.previousIndex!=-1 && m.refresh===true)
   setTimeout(function()
	{
		refreshTemp();
	},500);
});
