/**
* Author,email :     Aldrin Rasdas , arasdas@coca-cola.com
* Date Create  :     April, 2014
* Description  :     Contains config values (or some variables that set and read by othe JS files
*
* REVISION HISTORY
*
* Author,email :
* Date Revised :
* Description  :
*
**/

var config = new Object();

config.checkTabletMode = function() {
	var w = $("#deviceType").css('width');
	if (w=='2px') {
		return true;
	} else {
		return false;
	}
}

config.appTitle = "Travel FAQ";
config.appInternalVersion = "2.1";
config.tabletMode = config.checkTabletMode();//config.getDeviceType();
config.defaultCountryCode = 'CN';
config.updateAvailableMessage = 'New version of data is available for download.\n\nKindly sync with server to get the latest Travel FAQ data.';

config.localDBVersionKey = "tfaq.data.version";
config.localDBName = "TravelFAQData";
config.localDBDisp = "TFAQ Offline Storage";
config.localDBSize = 50 * 1024 * 1024;
config.localDBVersion = "1.0";
config.localDBCountryTable = 'country_detail';

config.remoteServerAddress = "http://icokecontent.chinacloudapp.cn/store/travelfaq/";
config.remoteDataFileName = "TravelFAQData.xml";
config.remoteDataFlagsFolder = "flags";
config.remoteConnectTimeout = 5000;

config.geoLatSearchKey = '<latitude>';
config.geoLngSearchKey = '<longitude>';
config.googleMapApiURL = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=<latitude>,<longitude>&sensor=true';
config.geonamesApiURL = 'http://api.geonames.org/findNearbyPlaceNameJSON?formatted=true&lat=<latitude>&lng=<longitude>&username=kotravelfaq';
config.gisgraphyApiURL = 'http://services.gisgraphy.com/street/search?lat=<latitude>&lng=<longitude>&from=1&to=1&format=json';
config.nominatimApiURL = 'https://nominatim.openstreetmap.org/reverse?format=json&lat=<latitude>&lon=<longitude>&addressdetails=1';
config.mapCoords1Key = '<latlng_1>';
config.mapCoords2Key = '<latlng_2>';



config.defaultIconPath = 'images/icons/default.png';
config.localImageFolderPath = 'flags';
config.localImageFolderPath2 = 'images/icons/flags'; /* HACK localized for sidebar */
config.fileSystemRootFolder = '';





config.detailLabels = [
	{text:"Voice Call",icon:"voice.png",id:"voicecall"},
	{text:"InterCall",icon:"intercall.png",id:"intercall"},
	{text:"Office Location",icon:"office.png",id:"officeloc"},
	{text:"KO Metrics / Facts",icon:"metrics.png",id:"kometrics"},
	{text:"Preferred Hotels",icon:"hotel.png",id:"prefhotel"},
	{text:"Useful Info",icon:"info.png",id:"usefulinfo"}
];
	
	
config.fixCountryFilter = false;
config.locationCoarseTimeout = 15000;
config.geoJSONCountriesFile = "countries.geojson";