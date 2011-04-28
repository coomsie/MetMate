//create UI for Radar tab

function view_init_Radar(win)
{
	//
	Titanium.API.info("UI - create weather window");
	//
	
	win.backgroundColor='#fff';
	win.backgroundGradient={type:'linear', colors:['#000001','#6666'], startPoint:{x:0,y:0}, endPoint:{x:320,y:480}, backFillStart:false};
	win.title='Rain Radar';
	win.barColor='#215B6D';
	win.translucent=true;
	
	Ti.App.addEventListener('fireEvent_createImage', function(e){
		
    	var image1 = Titanium.UI.createImageView({
			images:e.imgs,
			duration:200, // in milliseconds, the time before next frame is shown
			repeatCount:0,  // 0 means animation repeats indefinitely, use > 1 to control repeat count
			top:0,
			width:320,
			height:460,
			canScale:true,
			enableZoomControls:false,
			zIndex:10
			});
		
		// listen for load event (when all images are loaded)
		image1.addEventListener('load', function(e) {
		// start animation
		image1.start();
			});
		
		win.add(image1);
		
		});

};
