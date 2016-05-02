/**
* Author,email :     Aldrin Rasdas , arasdas@coca-cola.com
* Date Create  :     April, 2014
* Description  :     Contains methods/functions that deal mainly with local data
*
* REVISION HISTORY
*
* Author,email :
* Date Revised :
* Description  :
*
**/

var localStore = new Object();

localStore.dataVersionKey = config.localDBVersionKey;
localStore.dbName = config.localDBName;
localStore.dbDispName = config.localDBDisp;
localStore.dbSize = config.localDBSize;
localStore.dbVer = config.localDBVersion;
localStore.dbTable = config.localDBCountryTable;
localStore.dataBase = window.openDatabase(localStore.dbName, localStore.dbVer, localStore.dbDispName, localStore.dbSize);

localStore.updateData = function(data, finishCallback) {
	D("Call localStore.updateData()...");
	
	localStore.dataBase.transaction(
		function (tx) {			 		
			D("Dropping local table...");
			tx.executeSql('DROP TABLE IF EXISTS ' + localStore.dbTable);
		
			D("Creating table...");
        	tx.executeSql('CREATE TABLE IF NOT EXISTS ' + localStore.dbTable + '(' + 
			'code TEXT NOT NULL PRIMARY KEY,' + 
			'name TEXT,' + 
			'region TEXT,' +
			'intercall TEXT,' + 
			'voicecall TEXT,' + 
			'officeloc1 TEXT,' + 
			'coords1 TEXT,' +			
			'officeloc2 TEXT,' + 
			'coords2 TEXT,' +			
			'officeloc3 TEXT,' + 
			'coords3 TEXT,' +			
			'officeloc4 TEXT,' + 
			'coords4 TEXT,' +			
			'officeloc5 TEXT,' + 
			'coords5 TEXT,' +	
			'officeloc6 TEXT,' +
			'coords6 TEXT,' +
			'officeloc7 TEXT,' +
			'coords7 TEXT,' +
			'officeloc8 TEXT,' +
			'coords8 TEXT,' +
			'officeloc9 TEXT,' +
			'coords9 TEXT,' +
			'officeloc10 TEXT,' +
			'coords10 TEXT,' +
			'officeloc11 TEXT,' +
			'coords11 TEXT,' +
			'officeloc12 TEXT,' +
			'coords12 TEXT,' +
			'officeloc13 TEXT,' +
			'coords13 TEXT,' +
			'officeloc14 TEXT,' +
			'coords14 TEXT,' +
			'officeloc15 TEXT,' +
			'coords15 TEXT,' +
			'officeloc16 TEXT,' +
			'coords16 TEXT,' +
			'officeloc17 TEXT,' +
			'coords17 TEXT,' +
			'officeloc18 TEXT,' +
			'coords18 TEXT,' +
			'officeloc19 TEXT,' +
			'coords19 TEXT,' +
			'officeloc20 TEXT,' +
			'coords20 TEXT,' +			
			'metric TEXT,' +
			'hotel TEXT,' +
			'info TEXT,' +
			'dialcode);');		
			
			if (!data.length) {
				data = [data];
			}
		
			var len = data.length;		
			
			D("Popuplating data...");
			for (i=0; i<len; i++) {
				var CountryCode = atomJSONEntryGetFieldValue(data[i],"CountryISOCode");
				var CountryName = atomJSONEntryGetFieldValue(data[i],"CountryName");
				var RegionValue = atomJSONEntryGetFieldValue(data[i],"RegionValue");
				var InterCallNo = atomJSONEntryGetFieldValue(data[i],"InterCall");
				var VoiceCallNo = atomJSONEntryGetFieldValue(data[i],"VoiceCall");
				var OfficeLocation1 = atomJSONEntryGetFieldValue(data[i],"OfficeLocation1");
				var MapCoords1 =  atomJSONEntryGetFieldValue(data[i],"OfficeLoc1Coordinates");
				var OfficeLocation2 = atomJSONEntryGetFieldValue(data[i],"OfficeLocation2");
				var MapCoords2 =  atomJSONEntryGetFieldValue(data[i],"OfficeLoc2Coordinates");
				var OfficeLocation3 = atomJSONEntryGetFieldValue(data[i],"OfficeLocation3");
				var MapCoords3 =  atomJSONEntryGetFieldValue(data[i],"OfficeLoc3Coordinates");
				var OfficeLocation4 = atomJSONEntryGetFieldValue(data[i],"OfficeLocation4");
				var MapCoords4 =  atomJSONEntryGetFieldValue(data[i],"OfficeLoc4Coordinates");
				var OfficeLocation5 = atomJSONEntryGetFieldValue(data[i],"OfficeLocation5");
				var MapCoords5 =  atomJSONEntryGetFieldValue(data[i],"OfficeLoc5Coordinates");
				var OfficeLocation6 = atomJSONEntryGetFieldValue(data[i],"OfficeLocation6");
				var MapCoords6 =  atomJSONEntryGetFieldValue(data[i],"OfficeLoc6Coordinates");
				var OfficeLocation7 = atomJSONEntryGetFieldValue(data[i],"OfficeLocation7");
				var MapCoords7 =  atomJSONEntryGetFieldValue(data[i],"OfficeLoc7Coordinates");
				var OfficeLocation8 = atomJSONEntryGetFieldValue(data[i],"OfficeLocation8");
				var MapCoords8 =  atomJSONEntryGetFieldValue(data[i],"OfficeLoc8Coordinates");
				var OfficeLocation9 = atomJSONEntryGetFieldValue(data[i],"OfficeLocation9");
				var MapCoords9 =  atomJSONEntryGetFieldValue(data[i],"OfficeLoc9Coordinates");
				var OfficeLocation10 = atomJSONEntryGetFieldValue(data[i],"OfficeLocation10");
				var MapCoords10 =  atomJSONEntryGetFieldValue(data[i],"OfficeLoc10Coordinates");
				var OfficeLocation11 = atomJSONEntryGetFieldValue(data[i],"OfficeLocation11");
				var MapCoords11 =  atomJSONEntryGetFieldValue(data[i],"OfficeLoc11Coordinates");
				var OfficeLocation12 = atomJSONEntryGetFieldValue(data[i],"OfficeLocation12");
				var MapCoords12 =  atomJSONEntryGetFieldValue(data[i],"OfficeLoc12Coordinates");
				var OfficeLocation13 = atomJSONEntryGetFieldValue(data[i],"OfficeLocation13");
				var MapCoords13 =  atomJSONEntryGetFieldValue(data[i],"OfficeLoc13Coordinates");
				var OfficeLocation14 = atomJSONEntryGetFieldValue(data[i],"OfficeLocation14");
				var MapCoords14 =  atomJSONEntryGetFieldValue(data[i],"OfficeLoc14Coordinates");
				var OfficeLocation15 = atomJSONEntryGetFieldValue(data[i],"OfficeLocation15");
				var MapCoords15 =  atomJSONEntryGetFieldValue(data[i],"OfficeLoc15Coordinates");
				var OfficeLocation16 = atomJSONEntryGetFieldValue(data[i],"OfficeLocation16");
				var MapCoords16 =  atomJSONEntryGetFieldValue(data[i],"OfficeLoc16Coordinates");
				var OfficeLocation17 = atomJSONEntryGetFieldValue(data[i],"OfficeLocation17");
				var MapCoords17 =  atomJSONEntryGetFieldValue(data[i],"OfficeLoc17Coordinates");
				var OfficeLocation18 = atomJSONEntryGetFieldValue(data[i],"OfficeLocation18");
				var MapCoords18 =  atomJSONEntryGetFieldValue(data[i],"OfficeLoc18Coordinates");
				var OfficeLocation19 = atomJSONEntryGetFieldValue(data[i],"OfficeLocation19");
				var MapCoords19 =  atomJSONEntryGetFieldValue(data[i],"OfficeLoc19Coordinates");
				var OfficeLocation20 = atomJSONEntryGetFieldValue(data[i],"OfficeLocation20");
				var MapCoords20 =  atomJSONEntryGetFieldValue(data[i],"OfficeLoc20Coordinates");
				var KOMetricsFacts = atomJSONEntryGetFieldValue(data[i],"KOMetricsFacts");
				var UsefulInfo = atomJSONEntryGetFieldValue(data[i],"UsefulInfo");			
				var PrefHotel =  atomJSONEntryGetFieldValue(data[i],"PreferredHotel");				
				var CoutryDialCode =  atomJSONEntryGetFieldValue(data[i],"CountryDialInCode");			
				
				MapCoords1 = MapCoords1.replace(" ", "");
				MapCoords2 = MapCoords2.replace(" ", "");
				MapCoords3 = MapCoords3.replace(" ", "");
				MapCoords4 = MapCoords4.replace(" ", "");
				MapCoords5 = MapCoords5.replace(" ", "");
				MapCoords6 = MapCoords6.replace(" ", "");
				MapCoords7 = MapCoords7.replace(" ", "");
				MapCoords8 = MapCoords8.replace(" ", "");
				MapCoords9 = MapCoords9.replace(" ", "");
				MapCoords10 = MapCoords10.replace(" ", "");
				MapCoords11 = MapCoords11.replace(" ", "");
				MapCoords12 = MapCoords12.replace(" ", "");
				MapCoords13 = MapCoords13.replace(" ", "");
				MapCoords14 = MapCoords14.replace(" ", "");
				MapCoords15 = MapCoords15.replace(" ", "");
				MapCoords16 = MapCoords16.replace(" ", "");
				MapCoords17 = MapCoords17.replace(" ", "");
				MapCoords18 = MapCoords18.replace(" ", "");
				MapCoords19 = MapCoords19.replace(" ", "");
				MapCoords20 = MapCoords20.replace(" ", "");				
				
				tx.executeSql('INSERT INTO ' + localStore.dbTable + ' (code, name, region, intercall, voicecall, officeloc1, coords1, officeloc2, coords2, officeloc3, coords3, officeloc4, coords4, officeloc5, coords5, officeloc6, coords6, officeloc7, coords7, officeloc8, coords8, officeloc9, coords9, officeloc10, coords10, officeloc11, coords11, officeloc12, coords12, officeloc13, coords13, officeloc14, coords14, officeloc15, coords15, officeloc16, coords16, officeloc17, coords17, officeloc18, coords18, officeloc19, coords19, officeloc20, coords20, metric, info, hotel, dialcode) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
				[CountryCode, CountryName, RegionValue, InterCallNo, VoiceCallNo, OfficeLocation1, MapCoords1, OfficeLocation2, MapCoords2, OfficeLocation3, MapCoords3, OfficeLocation4, MapCoords4, OfficeLocation5, MapCoords5, OfficeLocation6, MapCoords6, OfficeLocation7, MapCoords7, OfficeLocation8, MapCoords8, OfficeLocation9, MapCoords9, OfficeLocation10, MapCoords10, OfficeLocation11, MapCoords11, OfficeLocation12, MapCoords12, OfficeLocation13, MapCoords13, OfficeLocation14, MapCoords14, OfficeLocation15, MapCoords15, OfficeLocation16, MapCoords16, OfficeLocation17, MapCoords17, OfficeLocation18, MapCoords18, OfficeLocation19, MapCoords19, OfficeLocation20, MapCoords20, KOMetricsFacts, UsefulInfo, PrefHotel, CoutryDialCode]);				

			}			
			
			if (finishCallback) {
				finishCallback();
			}
		},
		function(err) {
			D(err.message);
		}
	);		
}

localStore.getData = function(sql, filter, params, callBack) {	
	D("Calling localStore.getData()...");
	localStore.dataBase.transaction(
		function (tx) {			 
			var sqlStmt = sql + ' from ' + localStore.dbTable;
			if (filter) {
				sqlStmt += ' where ' + filter;
			}
			
			sqlStmt += ' ORDER BY REGION, NAME';			
			
			D("SQL Statement: " + sqlStmt);
			tx.executeSql( sqlStmt ,params, 
			
			function(tx, results) {
				var localData = new Array();
				var len = results.rows.length, i;
				
				D("SELECT QUERY returned " + len + " records")
				for (i = 0; i < len; i++) {
					var row = results.rows.item(i)
					localData[i] = row;
				}
				
				if (callBack) callBack(localData);
			}, 
			
			function(err) {
				D(err.message);
				var localData = new Array();
				if (callBack) callBack(localData);
			});
		}
	);
}

localStore.setDataVersion = function(v) {
	D("Setting local data version to " + v);
	window.localStorage.setItem(localStore.dataVersionKey, v);
}

localStore.getDataVersion = function() {
	var d = window.localStorage.getItem(localStore.dataVersionKey);
	if (d) return d;
	else return '0';
}