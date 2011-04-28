// create 3Day tab

	function view_init_3Day(win) {
	//
	// create base UI tab and root window
	Titanium.API.info("UI - create 3DayTab window");
	//
	win.backgroundColor='#fff';
	win.backgroundGradient={type:'linear', colors:['#000001','#6666'], startPoint:{x:0,y:0}, endPoint:{x:320,y:480}, backFillStart:false};
	win.title='Forecast - 3 Days';
	win.barColor='#215B6D';
	win.translucent=true;	

	}

// //7Day tab
// var win4 = Titanium.UI.createWindow({
// 	backgroundColor:'#fff',
// 	backgroundGradient:{type:'linear', colors:['#000001','#6666'], startPoint:{x:0,y:0}, endPoint:{x:320,y:480}, backFillStart:false},
// 	navBarHidden: true
// });
// var tab4 = Titanium.UI.createTab({
// 	icon:'radar.png',
// 	title:'7 Day',
// 	window:win4
// });
// 
// var label4 = Titanium.UI.createLabel({
// 	color:'#999',
// 	text:'loading ...',
// 	font:{fontSize:20,fontFamily:'Helvetica Neue'},
// 	textAlign:'center',
// 	touchEnabled: false,
// 	width:'auto'
// });
// 
// win4.add(label4);
// 
// var image7 = Titanium.UI.createImageView({
// 	//image : radarimgs[0],
// 	images:['71.png','72.png','73.png'],
// 	duration:200, // in milliseconds, the time before next frame is shown
// 	repeatCount:0,  // 0 means animation repeats indefinitely, use > 1 to control repeat count
// 	top:0,
// 	width:320,
// 	height:460
// });
