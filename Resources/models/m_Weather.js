// Defines whatever is the model and its methods
 
//model
var m = {};
m.userProfile = {
  cityname: "",
  citycode: 0
};

m.errorDialog = Titanium.UI.createAlertDialog({
    title: ':( Error - send to creator',
    message: '',
    buttonNames: ['OK','Cancel']
});

m.radarpicsURI = "http://www.metservice.co.nz";

// create table view data object
m.tableview = Titanium.UI.createTableView({
				data:null,
				allowsSelection:false
				});
m.TableViewRows = [];
m.blankrow = Ti.UI.createTableViewRow({height:'50',backgroundColor:'#dddddd'});

m.data_todays=null;
m.data_forecast=null;
m.refresh=false;
m.radarimgs = [];
m.RadarDataPics=null;
m.forecastimgs = [];
m.ForecastdataPics=null;
m.Pickerdata = [];
m.Pickerdata[0]=Titanium.UI.createPickerRow({title:'AUCKLAND',custom_item:'93110'});
m.Pickerdata[1]=Titanium.UI.createPickerRow({title:'BLENHEIM',custom_item:'93579'});
m.Pickerdata[2]=Titanium.UI.createPickerRow({title:'CHRISTCHURCH',custom_item:'93781'});
m.Pickerdata[3]=Titanium.UI.createPickerRow({title:'DUNEDIN',custom_item:'93891'});
m.Pickerdata[4]=Titanium.UI.createPickerRow({title:'GISBORNE',custom_item:'93292'});
m.Pickerdata[5]=Titanium.UI.createPickerRow({title:'GORE',custom_item:'93864'});
m.Pickerdata[6]=Titanium.UI.createPickerRow({title:'HAMILTON',custom_item:'93173'});
m.Pickerdata[7]=Titanium.UI.createPickerRow({title:'HOKITIKA',custom_item:'93615'});
m.Pickerdata[8]=Titanium.UI.createPickerRow({title:'INVERCARGILL',custom_item:'93845'});
m.Pickerdata[9]=Titanium.UI.createPickerRow({title:'KAIKOURA',custom_item:'93678'});
m.Pickerdata[10]=Titanium.UI.createPickerRow({title:'LEVIN',custom_item:'93410'});
m.Pickerdata[11]=Titanium.UI.createPickerRow({title:'MASTERTON',custom_item:'93467'});
m.Pickerdata[12]=Titanium.UI.createPickerRow({title:'NAPIER',custom_item:'93373'});
m.Pickerdata[13]=Titanium.UI.createPickerRow({title:'NELSON',custom_item:'93546'});
m.Pickerdata[14]=Titanium.UI.createPickerRow({title:'NEW-PLYMOUTH',custom_item:'93309'});
m.Pickerdata[15]=Titanium.UI.createPickerRow({title:'OAMARU',custom_item:'93797'});
m.Pickerdata[16]=Titanium.UI.createPickerRow({title:'PALMERSTON-NORTH',custom_item:'93404'});
m.Pickerdata[17]=Titanium.UI.createPickerRow({title:'PARAPARAUMU',custom_item:'93420'});
m.Pickerdata[18]=Titanium.UI.createPickerRow({title:'QUEENSTOWN',custom_item:'93831'});
m.Pickerdata[19]=Titanium.UI.createPickerRow({title:'ROTORUA',custom_item:'93247'});
m.Pickerdata[20]=Titanium.UI.createPickerRow({title:'RUSSELL',custom_item:'93021'});
m.Pickerdata[21]=Titanium.UI.createPickerRow({title:'TAUPO',custom_item:'93245'});
m.Pickerdata[22]=Titanium.UI.createPickerRow({title:'TAURANGA',custom_item:'93186'});
m.Pickerdata[23]=Titanium.UI.createPickerRow({title:'TIMARU',custom_item:'93773'});
m.Pickerdata[24]=Titanium.UI.createPickerRow({title:'WANAKA',custom_item:'93729'});
m.Pickerdata[25]=Titanium.UI.createPickerRow({title:'WANGANUI',custom_item:'93327'});
m.Pickerdata[26]=Titanium.UI.createPickerRow({title:'WELLINGTON',custom_item:'93437'});
m.Pickerdata[27]=Titanium.UI.createPickerRow({title:'WESTPORT',custom_item:'93515'});
m.Pickerdata[28]=Titanium.UI.createPickerRow({title:'WHAKATANE',custom_item:'93191'});
m.Pickerdata[29]=Titanium.UI.createPickerRow({title:'WHANGAREI',custom_item:'93057'});

//extend for android issue/workaround
m.PickerdataAndroid = [];
m.PickerdataAndroid[0]='93110';
m.PickerdataAndroid[1]='93579';
m.PickerdataAndroid[2]='93781';
m.PickerdataAndroid[3]='93891';
m.PickerdataAndroid[4]='93292';
m.PickerdataAndroid[5]='93864';
m.PickerdataAndroid[6]='93173';
m.PickerdataAndroid[7]='93615';
m.PickerdataAndroid[8]='93845';
m.PickerdataAndroid[9]='93678';
m.PickerdataAndroid[10]='93410';
m.PickerdataAndroid[11]='93467';
m.PickerdataAndroid[12]='93373';
m.PickerdataAndroid[13]='93546';
m.PickerdataAndroid[14]='93309';
m.PickerdataAndroid[15]='93797';
m.PickerdataAndroid[16]='93404';
m.PickerdataAndroid[17]='93420';
m.PickerdataAndroid[18]='93831';
m.PickerdataAndroid[19]='93247';
m.PickerdataAndroid[20]='93021';
m.PickerdataAndroid[21]='93245';
m.PickerdataAndroid[22]='93186';
m.PickerdataAndroid[23]='93773';
m.PickerdataAndroid[24]='93729';
m.PickerdataAndroid[25]='93327';
m.PickerdataAndroid[26]='93437';
m.PickerdataAndroid[27]='93515';
m.PickerdataAndroid[28]='93191';
m.PickerdataAndroid[29]='93057';