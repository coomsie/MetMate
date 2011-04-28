function getradarpics(i) {
	var xhr = Titanium.Network.createHTTPClient();

	xhr.onload = function() {
		try{
		var radarDir = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'radar');
		radarDir.createDirectory();
		var f = Titanium.Filesystem.getFile(radarDir.nativePath,i+'.jpeg');
		f.write(this.responseData);
		Ti.API.info(f.nativePath);
		m.radarimgs.push(f.nativePath);
		}
			catch(e){
				m.errorDialog.message = e.error;
				m.errorDialog.show();
		}
		Ti.App.fireEvent('fireEvent_createImage',{imgs: m.radarimgs});
	};
	xhr.onerror = function(e) {
		Ti.API.error('error radar pics:' + e.error);
		m.errorDialog.message = e.error;
		m.errorDialog.show();
	};
	// open the 	client (and test HTTPS)
	xhr.open('GET',m.radarpicsURI + m.RadarDataPics[m.RadarDataPics.length-1-i].url);

	// send the data
	xhr.send();
}

//add event foropen
win2.addEventListener('open', function(e) {
	Titanium.API.info("opened radar");
	
	messageLabel.text = 'refreshing ...';
	messageWin.open();
	setTimeout(function()
				{
					messageWin.close({opacity:0,duration:3000});
				},2000);
	
	var myresult;
	var xhr2 = Titanium.Network.createHTTPClient();
	xhr2.onload = function() {
		Ti.API.info('getting json for radars');
		try{
		m.RadarDataPics = JSON.parse(this.responseText);
		}
			catch(e){
				m.errorDialog.message = e.error;
				m.errorDialog.show();
			}
		Ti.API.info(m.RadarDataPics);
		Ti.API.info(m.RadarDataPics.length);
		Ti.API.info(m.RadarDataPics[0].url);
		//load radar images
		for (var i=0;i<m.RadarDataPics.length;i++) {
			//get image from server and download to file system
			getradarpics(i);

		}
		Ti.API.info(m.radarimgs);

	};
	xhr2.onerror = function(e) {
		Ti.API.error('error radar data:' + e.error);
		m.errorDialog.message = e.error;
		m.errorDialog.show();
	};
	xhr2.open("GET","http://www.metservice.com/publicData/rainRadarAllNz");
	xhr2.send();

});
 