/**
* Author,email :     Aldrin Rasdas , arasdas@coca-cola.com
* Date Create  :     April, 2014
* Description  :     Contains methods/functions that deal mainly remote data
*
* REVISION HISTORY
*
* Author,email :
* Date Revised :
* Description  :
*
**/

var remoteStore = new Object();

remoteStore.serverURLPath = config.remoteServerAddress;
remoteStore.dataFileName = config.remoteDataFileName;
remoteStore.dataVersionFileName = config.remoteDataVersionFileName;
remoteStore.connectTimeout = config.remoteConnectTimeout;

remoteStore.getData = function(ajax, finishCallback, errorCallback) {
	
	//var ajax = new XMLHttpRequest();			
	ajax.timeout = remoteStore.connectTimeout;
	var url = remoteStore.serverURLPath + remoteStore.dataFileName + "?" + Math.random();
	
	ajax.open("GET",url,true);
	
	ajax.onabort = function() {
		D(error.message[error.ERROR_PROCESS_ABORTED]);
		if (errorCallback) errorCallback(error.ERROR_PROCESS_ABORTED);
	}
	
	ajax.ontimeout = function(){
		D(error.message[error.ERROR_TIMED_OUT]);
		if (errorCallback) errorCallback(error.ERROR_TIMED_OUT);
	}	
	
	ajax.onreadystatechange = function() {
		if (ajax.readyState == 4) {
			if (ajax.status == 0 || ajax.status == 200 || ajax.status==206) {
				if (ajax.statusText == 'OK' || ajax.statusText == 'Partial Content') {					
					
					if (!(ajax.responseText)) {										
						if (errorCallback) errorCallback(error.ERROR_NO_DATA);
						D(error.message[error.ERROR_NO_DATA]);
						return;
					}
					
					try {
						var data = xmlToJson($.parseXML(ajax.responseText));								
						
						if (!(data)) {
							if (errorCallback) errorCallback(error.ERROR_XML_MALFORMED);
							D(error.message[error.ERROR_XML_MALFORMED]);
							return;
						}
						if (!(data.feed)) {
							if (errorCallback) errorCallback(error.ERROR_XML_MALFORMED);
							D(error.message[error.ERROR_XML_MALFORMED]);
							return;
						}
						
						if (!(data.feed.entry)) {
							if (errorCallback) errorCallback(error.ERROR_XML_MALFORMED);
							D(error.message[error.ERROR_XML_MALFORMED]);
							return;
						}
						
						var dLen = data.feed.entry.length;
						if (dLen == 0) {					
							if (errorCallback) errorCallback(error.ERROR_XML_MALFORMED);
							D(error.message[error.ERROR_XML_MALFORMED]);
						} else {
							D("Data retrieved");
							if (finishCallback) finishCallback(data.feed.entry);
						}
						
					} catch (err) {
						D('Failed to parse result.');
						D(error.message[error.ERROR_XML_MALFORMED]);
						if (errorCallback) errorCallback(error.ERROR_XML_MALFORMED);
					}
					
				} else {					
					//what else could it be?
				}				
			} else {
				if (errorCallback) errorCallback(error.ERROR_SERVER_ERROR);
				D(error.message[error.ERROR_SERVER_ERROR]);	
				D(ajax.status + ': ' + ajax.statusText);				
			}
		} else {
			D(error.message[error.ERROR_SERVER_ERROR]);
			D("AJAX ready state is " + ajax.readyState);
		}
	}		
	
	try {
		D("Fetching " + url);
		ajax.send();      
	} catch (err) {
		D(err.message);
		D(error.message[error.ERROR_SEND_FAILED]);
		if (errorCallback) errorCallback(error.ERROR_SEND_FAILED);
	}
}

remoteStore.getDataVersion = function(finishCallback, errorCallback) {
	
	var ajax = new XMLHttpRequest();			
	ajax.timeout = remoteStore.connectTimeout;
	var url = remoteStore.serverURLPath + remoteStore.dataFileName + "?" + Math.random();
	
	ajax.open("GET",url,true);
	
	ajax.onabort = function() {
		D(error.message[error.ERROR_PROCESS_ABORTED]);
		if (errorCallback) errorCallback(error.ERROR_PROCESS_ABORTED);
	}
	
	ajax.ontimeout = function(){
		D(error.message[error.ERROR_TIMED_OUT]);
		if (errorCallback) errorCallback(error.ERROR_TIMED_OUT);
	}	
	
	ajax.onreadystatechange = function() {
		if (ajax.readyState == 4) {
			if (ajax.status == 0 || ajax.status == 200 || ajax.status==206) {
				if (ajax.statusText == 'OK' || ajax.statusText == 'Partial Content') {
					
					if (!(ajax.responseText)) {										
						if (errorCallback) errorCallback(error.ERROR_NO_DATA);
						D(error.message[error.ERROR_NO_DATA]);
						return;
					}
					
					var dat = getfirstNodeValue(ajax.responseText,'updated');
					if (dat && dat !='') {
						dat = new Date(dat);
						if (finishCallback) finishCallback(dat.getTime());
					}					

				} else {					
					//what else could it be?
				}				
			} else {
				if (errorCallback) errorCallback(error.ERROR_SERVER_ERROR);
				D(error.message[error.ERROR_SERVER_ERROR]);	
				D(ajax.status + ': ' + ajax.statusText);				
			}
		} else {
			D(error.message[error.ERROR_SERVER_ERROR]);
			D("AJAX ready state is " + ajax.readyState);
		}
	}		
	
	try {
		D("Fetching " + url);
		ajax.setRequestHeader("Range","bytes=0-600");
		ajax.send();      
	} catch (err) {
		D(err.message);
		D(error.message[error.ERROR_SEND_FAILED]);
		if (errorCallback) errorCallback(error.ERROR_SEND_FAILED);
	}
}