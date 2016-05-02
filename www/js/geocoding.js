/**
* Author,email :     Aldrin Rasdas , arasdas@coca-cola.com
* Date Create  :     April, 2014
* Description  :     Contains methods/functions that deal mainly with geocoding functions
*
* REVISION HISTORY
*
* Author,email :
* Date Revised :
* Description  :
*
**/

var geocoding = new Object();

geocoding.gpReturned = false;
geocoding.currentCountry = '';
geocoding.currentLocation = '';

geocoding.getCurrentCountry = function( callBack ) {
  $.ajaxSetup({

     timeout: remoteStore.connectTimeout

  });	
	
	//use OSM nominatim reverse geocoding API/search
	var getCountryCodeOSMnominatim  = function(lat,long,callBack) {
		var url = config.nominatimApiURL;
		url = url.replace(config.geoLatSearchKey,lat);
		url = url.replace(config.geoLngSearchKey,long);					
		$.getJSON(url,[],function(data,stat, ajax) {
			if (data && data.address && data.address.country_code) {
				D('Country found: ' + data.address.country_code);
				geocoding.currentCountry = data.address.country_code;
				if (callBack) callBack(data.address.country_code);
			} else {
				if (callBack) callBack();
			}
		}).fail(function() {
			if (callBack) callBack();
		});		
	}
	
	
	//use gisgraphy reverse geocoding API/search
	var getCountryCodeGisgraphy  = function(lat,long,callBack) {
		var url = config.gisgraphyApiURL;
		url = url.replace(config.geoLatSearchKey,lat);
		url = url.replace(config.geoLngSearchKey,long);	
		
		var failCallback = function() {
			D('Failed getting data from Gisgraphy. Switching to OSnominatim...');
			getCountryCodeOSMnominatim(lat, long, callBack);				
		}
		
		$.getJSON(url,[],function(data,stat, ajax) {
			if (data && data.result && data.result[0].countryCode) {
				D('Country found: ' + data.result[0].countryCode);
				geocoding.currentCountry = data.result[0].countryCode;
				if (callBack) callBack(data.result[0].countryCode);
			} else {
				failCallback();
			}			
		}).fail(failCallback);
	}
	
	//use geonames reverse geocoding API/search
	var getCountryCodeGeoNames = function(lat,long,callBack) {
		D('Getting country via GeoNames...');
		var url = config.geonamesApiURL;
		url = url.replace(config.geoLatSearchKey,lat);
		url = url.replace(config.geoLngSearchKey,long);					
		
		var failCallback = function() {
			D('Failed getting data from geonames. Switching to Gisgraphy...');
			getCountryCodeGisgraphy(lat, long, callBack);				
		}
		
		$.getJSON(url,[],function(data,stat, ajax) {
			if (data && data.geonames && data.geonames[0].countryCode) {
				D('Country found: ' + data.geonames[0].countryCode);
				geocoding.currentCountry = data.geonames[0].countryCode;
				if (callBack) callBack(data.geonames[0].countryCode);
			} else {
				failCallback();
			}			
		}).fail(failCallback);
	}
	
	var useGPS = hasConnection() ? false : true;
	var locTimeout = config.locationCoarseTimeout;
	if (useGPS) locTimeout += config.locationCoarseTimeout;
	
	geocoding.gpReturned = false;
	
	navigator.geolocation.getCurrentPosition(
		function(position) { //success
			D('Location acquired. Processing details...');		
			if (geocoding.gpReturned==false) {
				geocoding.gpReturned = true;
				geocoding.currentLocation = position.coords.latitude + ',' + position.coords.longitude;
				
				D('Finding country offline');
				var cCode = geocoding.getCountryCodeOffline(position.coords.latitude, position.coords.longitude);
				if (cCode && cCode != '') {
					D('Country found: ' + cCode);	
					geocoding.currentCountry = cCode;
					if (callBack) callBack(cCode);
				} else {
					D('Country not found offline.');
					if (hasConnection()) {					
						getCountryCodeGeoNames(position.coords.latitude, position.coords.longitude, callBack);
					} else {
						if (callBack) callBack();
					}	
				}
			}
		},
		function(posError) {						
			if (geocoding.gpReturned==false) {
				geocoding.gpReturned = true;
				geocoding.currentLocation = '';
				geocoding.currentCountry = '';
				D('Error acquiring location. Using defaults...');				
				if (callBack) callBack();
			}
		},
		{
			enableHighAccuracy: useGPS,
			timeout: locTimeout,
			maximumAge: 0
		}
	);		
	
	//this is if timeout won't work.
	setTimeout(function() {		
		if (geocoding.gpReturned==false) {
			geocoding.gpReturned = true;
			geocoding.currentLocation = '';
			geocoding.currentCountry = '';
			D('Geolocation coarse took longer than expected. Forcing timeout callback...');						
			if (callBack) callBack();
		}
	}, (locTimeout + 500)); // we added half second to make sure that we don't beat the actual timeout
}

geocoding.getCountryCodeOffline = function(lat,long) {	
	
	var point = [parseFloat(lat),parseFloat(long)];
	var matched = false;
	
	var data = geocoding.loadLocalGeoJSONCountries();
	
	if (data && data.length > 0) {	
		for (var i in data) {
			var countryData = data[i];
			if (countryData.geometry.type == 'Polygon') {
				var coords = countryData.geometry.coordinates[0];
				matched = geocoding.PointInPolygon(point, coords);
				if (matched) {
					break;
				}
			} else if (countryData.geometry.type == 'MultiPolygon') {						
				for (var j in countryData.geometry.coordinates) {															
					var coords = countryData.geometry.coordinates[j][0];
					matched = geocoding.PointInPolygon(point, coords);
					if (matched) {
						break;
					}
				}
			}
			
			if (matched) {
				return countryData.code;
			}
		}	
	}
}

//based on http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
geocoding.PointInPolygon = function(point, polygon) {
	var nvert = polygon.length;
	var c = false;
	var i = 0;
	var j = 0;
	for(i = 0, j = nvert-1; i < nvert; j = i++) {
	  if( ((polygon[i][0] > point[1]) != (polygon[j][0] > point[1])) && 
		 (point[0] < (polygon[j][1] - polygon[i][1]) * (point[1] - polygon[i][0]) / (polygon[j][0] - polygon[i][0]) + polygon[i][1]) ) {
		c = !c;
	  }
	}
	return c;	
}

geocoding.loadLocalGeoJSONCountries = function() {
	D('Loading GeoJSON countries...');
	var ajax = new XMLHttpRequest();
	var ret = null;
	ajax.open("GET",config.geoJSONCountriesFile,false);
	try {
		ajax.send();	
		if (ajax.readyState == 4) {
			if (ajax.status == 0 || ajax.status == 200) {
				if (ajax.responseText != '') {
					D('GeoJSON countries loaded!');
					ret = JSON.parse(ajax.responseText);
				}
			}
		}		
	}
	catch (error) {
		D('ERROR: ' + error.message);
	}	
	return ret;	
}