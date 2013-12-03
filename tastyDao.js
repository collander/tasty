	//Imports
	var fs = require('fs');
	var sqlite3 = require('sqlite3').verbose();
	
	//Fields
	var file = "tasting.db";
	var db = new sqlite3.Database(file);
	
	//Init
	if (!fs.existsSync(file)){
		runSql("CREATE TABLE TASTES (TYPE VARCHAR2, NAME VARCHAR2, RATING INT)");
	}
	
	reportError = function (err){
		console.log(err);
	};
	
	reportSuccess = function (){
		console.log("SUCCESS");
	};
	
	exports.submitEntry = function(params){
		var sql = 'INSERT INTO TASTES (TYPE, NAME, RATING) VALUES (?,?,?)';
		console.log(sql);
		db.run(sql, params.type, params.name, params.rating, reportError, reportSuccess);
	};
	
	exports.getEntries = function(callback){
		var sql = 'SELECT ROWID, * FROM TASTES';
		console.log(sql);
		db.all(sql, callback);
	};