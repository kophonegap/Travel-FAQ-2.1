/**
* Author,email :     Aldrin Rasdas , arasdas@coca-cola.com
* Date Create  :     April, 2014
* Description  :     Contains some helper functions and methods
*
* REVISION HISTORY
*
* Author,email :
* Date Revised :
* Description  :
*
**/

var showDebugAlerts = false;

function D(msg) {
	console.log("TFAQ Debug: " + msg);
	if (showDebugAlerts) alert(msg);
}

function autoEmailLink(html) {
	var re = /(([a-z0-9*._+]){1,}\@(([a-z0-9]+[-]?){1,}[a-z0-9]+\.){1,}([a-z]{2,4}|museum)(?![\w\s?&.\/;#~%"=-]*>))/g;
	return html.replace(re, '<a href="mailto:$1">$1</a>');
}

function autoHTTPLink(html) {
    var re = /((http|https|ftp):\/\/[\w?=&.\/-;#~%-]+(?![\w\s?&.\/;#~%"=-]*>))/g;
	return html.replace(re, '<a href="#" onclick="openExtLink(\'$1\');">$1</a> ');
}

function openExtLink(url) {
	window.open(url,'_system');
}

function dialPhoneNumber(phone) {
    var p = phone.replace(/ /g,'');
    p = p.replace(/[`~!@$%^&()_|\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
    p = p.trim();
    var pf = null;
    
    try {
        pf = device ? device.platform : null;				
    } catch(err) {
    }
    
    if (pf=='iOS') {
        openExtLink('telprompt://' + p);
    } else {
        openExtLink('tel://' + p);
    }
}

function autoLinkTelNo(html) {
	var telpat = [				
		
		//6 parts
		/(\+\d+\W\(\d+\)\W\d+\W\d+\W\d+\W\d+)/,   //+part (part) 4parts 
		/(\+\d+\W\(\d+\)\d+\W\d+\W\d+\W\d+)/,   //+part (part)4parts 
		/(\+\d+\(\d+\)\W\d+\W\d+\W\d+\W\d+)/,   //+part(part) 4parts 
		/(\+\d+\(\d+\)\d+\W\d+\W\d+\W\d+)/,   //+part(part)4parts
        
		/(\d+\W\(\d+\)\W\d+\W\d+\W\d+\W\d+)/,   //+part (part) 4parts
		/(\d+\W\(\d+\)\d+\W\d+\W\d+\W\d+)/,   //+part (part)4parts
		/(\d+\(\d+\)\W\d+\W\d+\W\d+\W\d+)/,   //+part(part) 4parts
		/(\d+\(\d+\)\d+\W\d+\W\d+\W\d+)/,   //+part(part)4parts
                
		/(\+\d+\W\d+\W\d+\W\d+\W\d+\W\d+)/,   //+6parts
		/(\(\d+\)\W\d+\W\d+\W\d+\W\d+\W\d+)/, //(part)-5parts
		/(\(\d+\)\d+\W\d+\W\d+\W\d+\W\d+)/,   //(part)5parts
		/(\d+\W\d+\W\d+\W\d+\W\d+\W\d+)/,     //6parts
		
		
		//5 parts
		/(\+\d+\W\(\d+\)\W\d+\W\d+\W\d+)/,
		/(\+\d+\W\(\d+\)\d+\W\d+\W\d+)/,
		/(\+\d+\(\d+\)\W\d+\W\d+\W\d+)/,
		/(\+\d+\(\d+\)\d+\W\d+\W\d+)/,
        
		/(\d+\W\(\d+\)\W\d+\W\d+\W\d+)/,
		/(\d+\W\(\d+\)\d+\W\d+\W\d+)/,
		/(\d+\(\d+\)\W\d+\W\d+\W\d+)/,
		/(\d+\(\d+\)\d+\W\d+\W\d+)/,
                
		/(\+\d+\W\d+\W\d+\W\d+\W\d+)/,
		/(\(\d+\)\W\d+\W\d+\W\d+\W\d+)/,
		/(\(\d+\)\d+\W\d+\W\d+\W\d+)/,
		/(\d+\W\d+\W\d+\W\d+\W\d+)/,
		
		//4 parts
		/(\+\d+\W\(\d+\)\W\d+\W\d+)/,
		/(\+\d+\W\(\d+\)\d+\W\d+)/,
		/(\+\d+\(\d+\)\W\d+\W\d+)/,
		/(\+\d+\(\d+\)\d+\W\d+)/,
        
		/(\d+\W\(\d+\)\W\d+\W\d+)/,
		/(\d+\W\(\d+\)\d+\W\d+)/,
		/(\d+\(\d+\)\W\d+\W\d+)/,
		/(\d+\(\d+\)\d+\W\d+)/,
        			
		/(\+\d+\W\d+\W\d+\W\d+)/,
		/(\(\d+\)\W\d+\W\d+\W\d+)/,
		/(\(\d+\)\d+\W\d+\W\d+)/,
		/(\d+\W\d+\W\d+\W\d+)/,
		
		//3 parts
		/(\+\d+\W\(\d+\)\W\d+)/,
		/(\+\d+\W\(\d+\)\d+)/,
		/(\+\d+\(\d+\)\W\d+)/,
		/(\+\d+\(\d+\)\d+)/,
        
		/(\d+\W\(\d+\)\W\d+)/,
		/(\d+\W\(\d+\)\d+)/,
		/(\d+\(\d+\)\W\d+)/,
		/(\d+\(\d+\)\d+)/,

		/(\+\d+\W\d+\W\d+)/,
		/(\(\d+\)\W\d+\W\d+)/,
		/(\(\d+\)\d+\W\d+)/,
		/(\d+\W\d+\W\d+)/,
        
        // the rest
		/(\+\d+\W\d\d\d\d+)/,
		/(\(\d+\)\W\d\d\d\d+)/,		
		/(\d+\W\d\d\d\d+)/,
		
		
		/(\+\d\d\d\d\d+)/,		
		/(\(\d+\)\d\d\d\d+)/,	
		/(\d\d\d\d\d+)/,	
		
		
		/(\*\d\d\d+)/,		
		
		//emergency numbers
		
		/(\D911)/, //US,canada
		/*
		/(\D112)/, //EU, ZA, CO
		/(\D100)/, //IL
		/(\D000)/, //AU
		/(\D101)/, //AR
		/(\D190)/, //BR
		/(\D111)/, //NZ
		/(\D191)/, //TH
		/(\D117)/, //PH
		/(\D110)/, //JP
		/(\D119)/, //Jamaica
		/(\D080)/, //MX
		/(\D143)/, //PH
		*/
		
		
	];
	var ph = '';
	for (var j in telpat) {
		telpat[j] = telpat[j].toString().substring(1);
		telpat[j] = telpat[j].toString().substring(0, telpat[j].length-1);
		ph += '$' + (parseInt(j)+1);
	}				
	
	var re = new RegExp(telpat.join('|'),'gm');
	//return html.replace(re,'<a href="tel:' + ph + '">' + ph + '</a>');
    return html.replace(re, '<a href="#" onclick="dialPhoneNumber(\'' + ph + '\');">' + ph + '</a>');
    //return html.replace(re, '<a href="tel://' + ph + '">' + ph + '</a>');
}

function autoLink(htmlIn) {
    var html = removeAnchors(htmlIn);
	return autoLinkTelNo(autoHTTPLink(autoEmailLink(html)));
}

function removeAnchors(txt) {
    txt = txt.replace(/<a\b[^>]*>/i,"");
    txt = txt.replace(/<\/a>/i, "");
    return txt;
}

function xmlToJson (xml) {
	
	// Create the return object
	var obj = {};

	if (xml.nodeType == 1) { // element
		// do attributes
		if (xml.attributes.length > 0) {
		obj["@attributes"] = {};
			for (var j = 0; j < xml.attributes.length; j++) {
				var attribute = xml.attributes.item(j);
				obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
			}
		}
	} else if (xml.nodeType == 3) { // text
		obj = xml.nodeValue;
	}

	// do children
	if (xml.hasChildNodes()) {
		for(var i = 0; i < xml.childNodes.length; i++) {
			var item = xml.childNodes.item(i);
			var nodeName = item.nodeName;
			if (typeof(obj[nodeName]) == "undefined") {
				obj[nodeName] = xmlToJson(item);
			} else {
				if (typeof(obj[nodeName].push) == "undefined") {
					var old = obj[nodeName];
					obj[nodeName] = [];
					obj[nodeName].push(old);
				}
				obj[nodeName].push(xmlToJson(item));
			}
		}
	}
	return obj;
}

function atomJSONEntryGetFieldValue(jsonAtomEntry, field) {
	try {
		var value = (jsonAtomEntry.content["m:properties"]["d:" + field]["#text"]);
	} catch (error) {
		//D(error.message);
	}	
	if (value === undefined) {
		value = '';
	} 
	
	return value;
}

var error = new Object();

error.ERROR_NO_DATA = 101;
error.ERROR_CONNECTION_FAILED = 102;
error.ERROR_SERVER_ERROR = 103;
error.ERROR_TIMED_OUT = 104;
error.ERROR_XML_MALFORMED = 105;
error.ERROR_SEND_FAILED = 106;
error.ERROR_PROCESS_ABORTED = 107;

error.message = {
	101: "No data",
	102: "Network error",
	103: "Server error",
	104: "Network timed-out",
	105: "Unexpected data received",
	106: "Error sending request to server",
	107: "Operation aborted"
};

function getDefaultCountry() {
	return config.defaultCountryCode;
}
                                                         
function getLastCountry() {
    var lc = window.localStorage.getItem('tfaq.lastcountry');
    if (lc && lc!='') {
        return lc;
    } else {
        return null;
    }
}

function setLastCountry(lc) {
    if (lc && lc!='') {
        window.localStorage.setItem('tfaq.lastcountry', lc);
    }
}

function isDesktop() {
	//partial implementation / it doesn't check if the script is running on desktop linux, osx, etc.
	if (navigator.platform == 'Win32') return true;
	else return false;
}

function hasConnection() {
	
	if (isDesktop()) return true; //when in desktop browser
	
	if ((typeof navigator.connection)=="undefined") {
		return false;
	}
	
	if ((typeof Connection)=="undefined") {
		return false;
	}
	
    var ns = navigator.connection.type;	
	
	if (ns == Connection.UNKNOWN || ns == Connection.NONE) {
		return false;
	}

	return true;
}

function localFileExists(path) {
	var ajax = new XMLHttpRequest();
	var ret = false;
	ajax.open("GET",path,false);
	try {
		ajax.send();	
		if (ajax.readyState == 4) {
			if (ajax.status == 0 || ajax.status == 200) {
				if (ajax.responseText != '') {
					ret = true;
				}
			}
		}		
	}
	catch (error) {
		D('ERROR: ' + error.message);
	}	
	return ret;
}

jQuery.fn.filterNode = function(name) {
  return this.find('*').filter(function() {
	return this.nodeName === name;
  });
};

function getfirstNodeValue(str, key) {
	var ret='';
	var skey = '<' + key + '>';
	var s = str.indexOf(skey);
	if (s>-1) {
		var e = str.indexOf('</' + key + '>');
		ret = str.substring(s + skey.length,e);		
	}
	return ret;
}