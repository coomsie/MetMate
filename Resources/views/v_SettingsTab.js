//create  Settngs UI
	function view_init_Settings(win,Pickerdata) {
		win.backgroundColor='#fff';
		win.backgroundGradient={type:'linear', colors:['#000001','#6666'], startPoint:{x:0,y:0}, endPoint:{x:320,y:480}, backFillStart:false};
		win.title='Region';
		win.barColor='#215B6D';
		win.translucent=true;
		
		win.picker = Titanium.UI.createPicker();

		// turn on the selection indicator (off by default)
		win.picker.selectionIndicator = true;
		
		win.picker.add(Pickerdata);
		
		win.label9 = Titanium.UI.createLabel({
			text:'Select your region ...',
			top:60,
			color: 'white',
			width:'auto',
			height:'auto',
			textAlign:'center',
			touchEnabled: false,
			font:{fontSize:20,fontStyle:'Helvetica'}
		});
		
		win.add(win.label9);
		
		win.nzimg = Ti.UI.createImageView({
			image: 'images/regions.png',
			top: 5,
			right: 5,
			width:'auto',
			height:'auto'
		});
		
		win.add(win.nzimg);
		
		win.add(win.picker);
		
		win.nzmet = Ti.UI.createImageView({
			image: 'images/MetLogo.gif',
			bottom: 70,
			left:5,
			width:125,
			height:25
		});
		
		win.add(win.nzmet);
		
		win.logo = Ti.UI.createImageView({
			image: 'images/coomsie.png',
			bottom:5,
			right:5,
			width:150,
			height: 73
		});
		
		win.add(win.logo);
		
		win.label5 = Titanium.UI.createLabel({
			text:'Data downloaded from the MetService web site: copyright 2011',
			bottom:5,
			width:'160',
			height:'auto',
			textAlign:'left',
			left: 5,
			touchEnabled: false,
			font:{fontSize:12,fontStyle:'Helvetica'}
		});
		
		win.add(win.label5);

	};

