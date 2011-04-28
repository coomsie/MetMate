

	//picker event
	win4.picker.addEventListener('change', function(e) {
		//add refresh button iOS
		if (Ti.Platform.name === 'iPhone OS')
		Ti.API.info("You selected row: "+e.row+", column: "+e.column+", custom_item: "+e.row.custom_item);

		Ti.API.info("You selected row: row index: "+e.rowIndex+", column index: "+e.columnIndex);

		// add android specific tests
		if (Titanium.Platform.osname === 'android')
		{
		Ti.API.info("setting prefs (android)");
		setPrefs(e.row.title,m.PickerdataAndroid[e.rowIndex]);
		}
		//add refresh button iOS
		if (Ti.Platform.name === 'iPhone OS') {
			Ti.API.info("setting prefs (iPhone)");
			setPrefs(e.row.title,e.row.custom_item);
		}
		m.refresh=true;
	});

	//window open event
	win4.addEventListener('load', function(e) {
		setPicker();
	});

	function setPicker()
	{
			for (rr=0;rr<m.Pickerdata.length-1;rr++) {
					if(m.PickerdataAndroid[rr] === m.userProfile.citycode)
					win4.picker.setSelectedRow(0,rr);
			};
	}
	
	function setPrefs(cityname,citycode)
	{
		
	m.userProfile = {
  					cityname: "",
  					citycode: 0
				};
	m.userProfile.citycode = citycode;
	m.userProfile.cityname = cityname;
	// set props
	Ti.App.Properties.setString("userProfile", JSON.stringify(m.userProfile));
	}
	
	function getPrefs()
	{
		
	test = Ti.App.Properties.getString("userProfile");
	if(test===null)
	{
		Ti.API.info("No Prefs file exists");
		return false;
	}else
	{
		Ti.API.info("Prefs file exists");
		m.userProfile = JSON.parse(Ti.App.Properties.getString("userProfile"));
		Ti.API.info('userProfile details =>' + m.userProfile);
		return true;
	}
	}