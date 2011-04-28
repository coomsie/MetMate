//3 Day forecast controller.

function getforecastpics(i) {
	var xhr = Titanium.Network.createHTTPClient();

	xhr.onload = function() {
		try{
		var threeDayDir = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'3DayForecast');
		threeDayDir.createDirectory();
		var f = Titanium.Filesystem.getFile(threeDayDir.nativePath,i+'.jpeg');
		f.write(this.responseData);
		Ti.API.info(f.nativePath);
		m.forecastimgs.push(f.nativePath);
		}
		catch(e){
				m.errorDialog.message = e.error;
				m.errorDialog.show();
			}
		var image1 = Titanium.UI.createImageView({
			images:m.forecastimgs,
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
		win3.add(image1);
		image1.show();
	};
	xhr.onerror = function(e) {
		Ti.API.error('error 3day pics:' + e.error);
		m.errorDialog.message = e.error;
		m.errorDialog.show();
	};
	// open the 	client (and test HTTPS)
	xhr.open('GET',m.radarpicsURI + m.ForecastdataPics[m.ForecastdataPics.length-1-i].url);

	// send the data
	xhr.send();
}

//add event foropen
win3.addEventListener('open', function(e) {
	Titanium.API.info("opened forecast");
	
	messageLabel.text = 'refreshing ...';
	messageWin.open();
	setTimeout(function()
				{
					messageWin.close({opacity:0,duration:3000});
				},2000);
				
	var myresult;
	var xhr2 = Titanium.Network.createHTTPClient();
	xhr2.onload = function() {
		Ti.API.info('getting json for forecasts');
		try{
		m.ForecastdataPics = JSON.parse(this.responseText);
		}
			catch(e){
				m.errorDialog.message = e.error;
				m.errorDialog.show();
			}
		Ti.API.info(m.ForecastdataPics);
		Ti.API.info(m.ForecastdataPics.length);
		Ti.API.info(m.ForecastdataPics[0].url);
		//load radar images
		for (var i=0;i<m.ForecastdataPics.length;i++) {

			//get image from server and download to file system

			getforecastpics(i);

		}
		Ti.API.info(m.radarimgs);

	};
	xhr2.onerror = function(e) {
		Ti.API.error('error 3day data:' + e.error);
		m.errorDialog.message = e.error;
		m.errorDialog.show();
	};
	xhr2.open("GET","http://www.metservice.com/publicData/rainForecast3Day");
	xhr2.send();

});
