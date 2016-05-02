/**
* Author,email :     Aldrin Rasdas , arasdas@coca-cola.com
* Date Create  :     April, 2014
* Description  :     Contains methods/functions that deal mainly with User Interface
*
* REVISION HISTORY
*
* Author,email :
* Date Revised :
* Description  :
*
**/
var appUI = new Object();

appUI.blocked = false;

appUI.slideCountries = function() {
	if (appUI.blocked) return;
	$("#listPanel").panel("toggle");
	/*var TheDivider = $('#allCountries a');
	var li = TheDivider.next(':not(#allCountries a)');
	li = li.next(':not(#allCountries a)').hide();*/
	//$("#allCountries li").hide();
	//(':not(.ui-li-divider)')
	
	
	
	//$("#allCountries .listDivider").show();
	
	
	
}

appUI.slideOptions = function() {
	if (appUI.blocked) return;
	$("#optionsPanel").panel("toggle");
	
	
	
}

appUI.popAbout = function() {
	$("#aboutDialog").popup("open");
	appUI.blocked = true;
}

appUI.initialize = function() {	
	
	$( "#updatePopupDialog").enhanceWithin().popup({history:false});
	$( "#updatePopupDialog" ).popup('close');
	
	$( "#updateProgressDialog").enhanceWithin().popup({history:false});
	$( "#updateProgressDialog" ).popup('close');	
	
	$( "#aboutDialog").enhanceWithin().popup({history:false});
	$( "#aboutDialog" ).popup('close');		
	
	
	$( "#exitDialog").enhanceWithin().popup({history:false});
	$( "#exitDialog" ).popup('close');	
	
	$( "#appName").html(config.appName);
	$( "#aboutVersion").html("Version " + config.appInternalVersion);
    
    $("#listPanel").on("panelbeforeclose",
        function(e) {
            $.mobile.silentScroll(0);
            window.setTimeout(function() {
                $.mobile.silentScroll(0);
            },1000);
        });
	
	appUI.setupDetailsHolder();
	
	appUI.resizeContent();	
	
			
	$(function(){
		   $('select').attr('role-data', 'collapsible');
		});	
}

appUI.setupDetailsHolder = function() {
	var d = $("#details");
	var html = '';

	if (config.tabletMode) {
		html += ('<ul data-role="listview" data-inset="true" data-theme="b">');
		for (var i in config.detailLabels) {
			html+='<li data-role="list-divider" data-collapsed="true">';
			html+= '<div class="detail-header"><img src="images/icons/' + config.detailLabels[i].icon + '" class="detail-icon">' + config.detailLabels[i].text + '</div>';
			html+='</li>';
			
			html+='<li>';
			html+='<p class="detail-item" id="' + config.detailLabels[i].id + '"></p>';
			html+='</li>';
		}
		html+='</ul>';

	} else {
		html+='<div data-role="collapsible-set" data-inset="true" data-theme="b" style="padding:0px;">';
		for (var i in config.detailLabels) {
			html+='<div data-role="collapsible">';
			html+='<h3><img src="images/icons/' + config.detailLabels[i].icon + '" class="detail-icon">' + config.detailLabels[i].text + '</h3>';
			html+='<p class="detail-item" id="' + config.detailLabels[i].id + '"></p>';
			html+='</div>';
		}
		html+='</div>';
	}
	
	d.html(html);
	d.trigger('create');
}

appUI.leftHeaderButtonClick = function() {
	if (appUI.isLandscape() && config.tabletMode) {
		appUI.gotoCurrentLocation();
		//appUI.collapseList();
	} else {
		appUI.slideCountries();
		//appUI.collapseList();
		
	
		
	}
}

/*
appUI.collapseList =  function() {
	if ($("#allCountries a").is(":hidden")) {
		//$("#allCountries a").show();
		return;
	}
}
*/

appUI.collapseList =  function() {
	if ($("#allCountries a").is(":hidden")) {
		//$("#allCountries a").show();
		return;
	}
}


appUI.isLandscape = function() {
	//return true;
	return window.orientation == 90 || window.orientation == -90;
}

appUI.arrangeScreenLayout = function() {
	if ($("#no_data").is(":visible")) {
		return;
	}

	if (config.tabletMode) {
		if (appUI.isLandscape()) {
			//landscape			
			appUI.switchToLandscape();
			$("#allCountries a").show();
			
			
		} else {
			//portrait
			appUI.switchToPortrait();
			$("#allCountries a").show();
			//$("#allCountries li").hide();
		}
		
	} else {
		appUI.switchToPortrait();
		$("#allCountries a").show();
		//$("#allCountries li").hide();
	}
	appUI.positionListFilter();	
}

appUI.switchToLandscape = function() {
	//$("#status-bar").addClass("hidden");
	$("#listPanelLandscape").append($("#listContainer").detach());
	$("#leftHeaderButton").addClass("ui-icon-location");
	$("#leftHeaderButton").removeClass("ui-icon-grid");
	$("#listPanelLandscapeHolder").css("width","30%");
	
	$("#contentHolder").css("width","70%");	
	$("#listPanelLandscapeHolder").show();
	$("#listPanel").hide();
	
	appUI.resizeContent();
	appUI.resizeCountryList();	
	//$("#allCountries li").show();
		
	
}

appUI.switchToPortrait = function() {
	$("#status-bar").show();
	//alert('sb');
	$("#listPanel").append($("#listContainer").detach());
	$("#leftHeaderButton").addClass("ui-icon-grid");
	$("#leftHeaderButton").removeClass("ui-icon-location");
	$("#listPanelLandscapeHolder").hide();
	$("#listPanelLandscapeHolder").css("width","0%");
	$("#contentHolder").css("width","100%");
	$("#listPanel").show();
	$("#listPanel").panel("close");
	
	appUI.resizeContent();
	appUI.resizeCountryList();
	//$("#allCountries li").hide();	
	//$("#allCountries li:not(:first-child)").hide();
	//$("#allCountries li.next(:first-child)").hide();
	
	
}

appUI.resizeCountryList = function() {
	
	var offset = config.fixCountryFilter ? 40 : 0;
	
	if (config.tabletMode) {
		if (appUI.isLandscape()) {
			$("#listContainer").css("height",($("body").height() - (130+offset)) + "px");			
		} else {
			$("#listContainer").css("height",($("body").height() - (50+offset)) + "px");
		}
	} else {
		$("#listContainer").css("height",($("body").height() - (50+offset)) + "px");		
	}
}

appUI.resizeContent = function() {
	var offset = $("#header").height() + $("#footer").height();
	$("#content").css("height",($("body").height() - (offset+5)) + "px");
	$("#details").css("height",($("#content").height() - (70)) + "px");	
				
}

appUI.checkUpdate = function (){
	remoteStore.getDataVersion(
		function(remoteVersion) {
			var localVersion = localStore.getDataVersion();
			D('Local version is ' + localVersion + ', remote version is ' + remoteVersion);
			if (parseInt(localVersion) < parseInt(remoteVersion)) {
				D(localVersion);
				D(remoteVersion);
				alert(config.updateAvailableMessage);
			}
		},
	
		function(msg) {
			D(msg);
		}
	);
}

appUI.initiateDataUpdate = function() {	

	if (!hasConnection()) {
		alert('Connection is required.\n\nPlease connect to internet and try again.');
		return;
	}
	var ajax = new XMLHttpRequest();
	
	var abortUpdate = function(event, ui) {
		ajax.abort();
		unbindAbortUpdate();
	}
	
	var unbindAbortUpdate = function() {
		$("#updateCancelBtn").off("click", abortUpdate);	
		appUI.blocked = false;	
	}

	var afterOpen = function(event, ui) {		
		appUI.blocked = true;
		$("#updateText").html("Downloading data...");
		remoteStore.getData( ajax, 
			function(data) { //finish callback
				localStore.updateData(data, 
					function() {					
						$("#updateText").html("Downloading country icons...");	
						appUI.downloadFlags(function() {
							var currentCode = $("#currentCountry").data("country-code");
							if (currentCode) {
								if (currentCode != '') {
									appUI.populateCountryDetails(currentCode);
									appUI.populateCountriesAll();
								} else {
									appUI.setUserScreen();
								}
							} else {
								appUI.setUserScreen();
							}
							
							unbindAbortUpdate();
							$("#updateProgressDialog").popup("close");
							$("#no_data").hide();							
						});
						
						//let's update the version number of local data
						remoteStore.getDataVersion(
							function(remoteVersion) {
								localStore.setDataVersion(remoteVersion);
							} );													
					});
			},
			
			function(e) { //error callback	
				unbindAbortUpdate();			
				$("#updateProgressDialog").popup("close");
				alert(error.message[e]);
			}
		);
		
		$("#updateProgressDialog").off("popupafteropen", afterOpen);
			
	};

	$("#updateProgressDialog").on("popupafteropen", afterOpen);
	
	$("#updateCancelBtn").on( "click", abortUpdate);

	$("#updateProgressDialog").popup("open");
}

appUI.downloadFlags = function(finishCallback) {
	
	var folder = config.localImageFolderPath;
	var remotePath = config.remoteServerAddress + '/' + config.remoteDataFlagsFolder + '/';
	var abort = false;
	var onSuccess = function (fs)
	{
		fs.root.getDirectory(folder, {create: true, exclusive: false},
		function(parent) {
			var pf = "Android";
			try {
				pf = device ? device.platform : null;				
			} catch(err) {}	
					
			folder = fs.root.toURL() + '/' + parent.name;
			if (pf=='Android') folder = cordova.file.externalApplicationStorageDirectory + '/' + parent.name ;
			
			localStore.getData("SELECT code", null, null, function(localData) {
				if (localData.length>0) {
					var rPaths = new Array();
					var lPaths = new Array();
					for (var i in localData) {
						rPaths.push(encodeURI(remotePath + localData[i].code.toLowerCase() + '.png?' + Math.random()));
						lPaths.push(folder + '/' + localData[i].code.toLowerCase() + '.png');
					}
					
					var count = localData.length;
					var index = 0;
					var ft = new FileTransfer();
					
					var downFinish = function(entry) {
						D('downloaded ' + entry.fullPath);
						downloadNextFile();
					}
					
					var downError = function() {
						downloadNextFile();
					}
					
					var downloadNextFile = function() {
						index++;
						if (index < count) {
							downStart(index);
						} else {
							if (finishCallback) finishCallback();
						}						
					}
					
					var downStart = function(currentIndex) {
						D('Downloading ' + rPaths[currentIndex]);
						ft.download(rPaths[currentIndex], lPaths[currentIndex], downFinish, downError,true,[]);
					}
					
					if (index < count) downStart(index);					
				}
			});
		},
		
		function() {
			D('Error creating/getting folder');
		});
	}
	var onFail = function (event)
	{
		 D(event.target.error.code);
	}	
	
	if (window.requestFileSystem) {
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onSuccess, onFail);	
	} else {
		if (finishCallback) finishCallback();
	}
}
	
appUI.closeMenu = function() {
	$("#optionsPanel").panel("close");
}

appUI.populateCountriesAll = function() {
	localStore.getData("SELECT *", null, null, function(localData) {			
		if (localData.length>0) {
			var len = localData.length;
			var list = $("#allCountries");
			list.empty();
			for (i=0; i<len; i++) {
				var code = localData[i].code;
				var name = localData[i].name;
				var li = document.createElement("li");
				var a = document.createElement("a");
				var title = document.createElement("span");
				var icon = document.createElement("img");
				icon.style.width = "30px";
				icon.style.height = "30px";
				
				
				
				
				
				//var iconPath = config.fileSystemRootFolder + '/' + config.localImageFolderPath + '/' + code.toLowerCase() + ".png?" + Math.random();
				
				var iconPath =  config.localImageFolderPath2 + '/' + code.toLowerCase() + ".png?" + Math.random();				
				//if (!localFileExists(iconPath) || localFileExists(iconPath)) {
					
			if (!localFileExists(iconPath)) {
					//iconPath = config.defaultIconPath;
					/* SIDE BAR'S ICON */
					iconPath = config.defaultIconPath;
				}
				icon.src = iconPath;			
				icon.style.verticalAlign="middle";
				icon.style.marginRight="20px";
				icon.style.marginLeft="5px";
				
				title.appendChild(icon);
				title.appendChild(document.createTextNode(name));
				
				a.appendChild(title);
				a.country = code;
				$(a).on("click", function() { {
					$("#listPanel").panel("close");
					$("#no_country_data").hide();
					appUI.populateCountryDetails(this.country,true);
				}});
				
				$(li).attr('region', localData[i].region);
				li.appendChild(a);
				list.append(li);

			}
						
			list.listview({
				autodividersSelector: function(li) {
					return $(li).attr('region');
					//$(li).attr('collapsible');
					//$("li").hide();
					
				}
			});						
			
			appUI.clearCountryFilter();
			appUI.positionListFilter();						
			list.listview("refresh");	
			//listview.attr("collapsible");															
			appUI.resizeContent();
			appUI.resizeCountryList();
		}				
	});		
}

appUI.clearCountryFilter = function() {
	$(".ui-filterable .ui-input-clear").click();
}

appUI.positionListFilter = function() {
	if (!config.fixCountryFilter) return;
	if (config.tabletMode && appUI.isLandscape()) {
		$("#listFilterLS").show();
		$("#listFilterLS").append($(".ui-filterable").detach());
		$("#allCountries").css("padding-top","20px");
		//$("#allCountries li").attr("collapsible");				
	} else {
		$("#listFilter").show();
		$("#listFilter").append($(".ui-filterable").detach());
		$("#allCountries").css("padding-top","0px");
		
		//$("#allCountries li").attr("collapsible");
		
	}
}

appUI.populateCountryDetails = function(countryCode) {
	localStore.getData("SELECT *", "code like ?", [countryCode], function(localData) {			
		if (localData.length>0) {			
			var pf = null;
			
			try {
				pf = device ? device.platform : null;				
			} catch(err) {
			}
			
			var mapShowURI = "maps:q=" + config.mapCoords1Key;
			var mapDirURI = "maps:saddr=" + config.mapCoords2Key + "&daddr=" + config.mapCoords1Key;
			if (pf && pf=="Android") mapShowURI = "geo:0,0?q=" + config.mapCoords1Key;
			if (pf && pf=="Android") mapDirURI = "https://maps.google.com/?q=" + config.mapCoords2Key + "+to+" + config.mapCoords1Key;

			//var imgPath = config.fileSystemRootFolder + '/' + config.localImageFolderPath + '/' + countryCode.toLowerCase() + ".png?" + Math.random();
			
			//var iconPath =  config.localImageFolderPath2 + '/' + code.toLowerCase() + ".png?" + Math.random();
			
			var imgPath = config.localImageFolderPath2 + '/' + countryCode.toLowerCase() + ".png?" + Math.random();
			
			//var imgPath2 = config.localImageFolderPath2 + '/' + countryCode.toLowerCase() + ".png?" + Math.random();
			
			
			
			if (!localFileExists(imgPath)) {				
				imgPath = config.defaultIconPath2;
				
				//imgPath = config.defaultIconPath;
				//alert(imgPath);
			} 
			
			
			
			$("#selected_country_header").show();
			
			$("#country_flag").css("background-image","url('" + imgPath + "')");
			$("#selected_country_name").html(localData[0].name + ' (+' + localData[0].dialcode + ')');
			$("#selected_country_region").html(localData[0].region);			
									
			var html = '';
			html = 	'<div class="detail-content">' + autoLink(localData[0].voicecall) + '</div>';
			$("#voicecall").html(html);
		
			html = '';
			html = 	'<div class="detail-content">' + autoLink(localData[0].intercall) + '</div>';
			$("#intercall").html(html);
			
			var ol = new Array();
			var oc = new Array();
			
			var loc = '';
			
			for (var i=1; i<=20; i++) {
				loc = localData[0]["officeloc" + i];
				if (loc && loc.trim() != '' && loc.trim() != '<div></div>') {
					ol.push(loc);
					oc.push(localData[0]["coords" + i]);
				}				
			}
			
			var officeLoc = '';
			var locStyle1 = 'border:none;';
			var locStyle2 = locStyle1 + 'border-bottom:0px solid #c0c0c0;';
			for (var i in ol) {				
				var locStyle = i==(ol.length-1) ? locStyle1 : locStyle2;
				officeLoc += '<div style="' + locStyle + '">' + autoLink(ol[i]);
				if (oc[i].trim()!='') {
					var mapLink = mapShowURI.replace(config.mapCoords1Key, oc[i]);
					
					if (geocoding.currentLocation != '') {
						if (geocoding.currentCountry && geocoding.currentCountry != '' && geocoding.currentCountry.toLowerCase() == countryCode.toLowerCase()) {
							var mapDirLink = mapDirURI.replace(config.mapCoords1Key, oc[i]);
							mapDirLink = mapDirLink.replace(config.mapCoords2Key, geocoding.currentLocation);
						}
					}
					<!--<button class="ui-btn ui-shadow ui-corner-all ui-btn-icon-left ui-icon-location">location</button>-->
					officeLoc +='<div class="ui-show-map-container">';
					
					officeLoc +='<button href="#" class="ui-btn ui-shadow ui-corner-all  ui-btn-icon-left ui-icon-location ui-btn-inline" onclick="openExtLink(\'' + mapLink + '\')">View Map</button>';
					if (mapDirLink) {
						officeLoc +='&nbsp;&nbsp;&nbsp;<button class="ui-btn ui-shadow ui-corner-all ui-btn-icon-left ui-icon-navigation ui-btn-inline" onclick="openExtLink(\'' +  mapDirLink + '\')">Navigate</button>';
					}
					officeLoc +='</div>';
				}	
				officeLoc +='</div><br>';				
			}			
			
						
			//$("#officeloc").html('<div class="detail-content">'+autoLink(localData[0].officeloc)+'</div>');			
			$("#officeloc").html('<div class="detail-content" style="border: none;">'+officeLoc+'</div>');			
			$("#kometrics").html('<div class="detail-content">'+autoLink(localData[0].metric)+'</div>');			
			$("#usefulinfo").html('<div class="detail-content">'+autoLink(localData[0].info)+'</div>');			
			$("#prefhotel").html('<div class="detail-content">'+autoLink(localData[0].hotel)+'</div>');			
			$("#currentCountry").data("country-code",countryCode);
            setLastCountry(countryCode);
		}
	});
		
	$("#details").show(50,"swing");
}

appUI.launchFirstScreen = function( countryCode ) {	
	localStore.getData("SELECT *", null, null, 
		function(localData) {
			if (localData.length>0) {
            
				appUI.populateCountriesAll();
				
				if (!countryCode) {
					countryCode = getLastCountry();
				}
                
				if (countryCode=='') {
					countryCode = getLastCountry();
				}
                
 				if (!countryCode) {
					countryCode = getDefaultCountry();
				}
				
				if (countryCode=='') {
					countryCode = getDefaultCountry();
				}
				if ((countryCode) && (countryCode!='')) {
					localStore.getData("SELECT *", "code like ?", [countryCode], function(localData) {			
						if (localData.length>0) {
							appUI.arrangeScreenLayout();
							appUI.populateCountryDetails(countryCode);
							appUI.closeSplashScreen();
						} else {
                            countryCode = getLastCountry();
                            if (!countryCode || countryCode == '') {
                                countryCode = getDefaultCountry();
                            }
							localStore.getData("SELECT *", "code like ?", [countryCode], function(localData) {			
								if (localData.length>0) {
									appUI.arrangeScreenLayout();	
									appUI.populateCountryDetails(countryCode);
									appUI.closeSplashScreen();
								} else {
									$("#no_country_data").show();
									appUI.arrangeScreenLayout();
									appUI.slideCountries();
									appUI.closeSplashScreen();
								}
							});
						}
					});
				}
				
				if (hasConnection()) {
					appUI.checkUpdate(); 
				}
			} else {
				$("#no_data").show();
				appUI.resizeContent();
				appUI.closeSplashScreen();
			}
		}
	);
}

appUI.closeSplashScreen = function() {
	if (navigator.splashscreen) {
		navigator.splashscreen.hide();
	}	
	
	if (config.tabletMode) {
		appUI.unfixOrientation();
	} else {
		appUI.fixPortrait();
	}
}

appUI.fixPortrait = function() {
	try {
		window.plugins.orientationLock.lock("portrait");
	} catch (err) {}			
}

appUI.fixLandscape = function() {
	try {
		window.plugins.orientationLock.lock("landscape");
	} catch (err) {}			
}

appUI.unfixOrientation = function() {
	try {		
		window.plugins.orientationLock.unlock();
	} catch (err) {}
}


appUI.setUserScreen = function() {
	if (!navigator.geolocation) {
		appUI.launchFirstScreen();
		return;
	}
	
	localStore.getData("SELECT *", null, null, 
		function(localData) {
			if (localData.length>0) {
				appUI.populateCountriesAll();
				geocoding.getCurrentCountry(
					function(countryCode) {
						appUI.launchFirstScreen(countryCode);
					}
				);
				//appUI.launchFirstScreen();
			} else {
				appUI.launchFirstScreen();
				return;				
			}
		}
	);	
}

appUI.gotoCurrentLocation = function() {
	
	if (!navigator.geolocation) {
		return;
	}
	
	localStore.getData("SELECT *", null, null, 
		function(localData) {
			if (localData.length>0) {				
				geocoding.getCurrentCountry(
					function(countryCode) {
						appUI.populateCountryDetails(countryCode);
						$("#listPanel").panel("close");
					}
				);
			} else {
				//no data
			}
		}
	);	
}


