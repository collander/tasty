	//Imports
	var fs = require('fs');
	var adapter = require('pg');
	
	//Fields
	var file = "tasting.db";
	var db = new sqlite3.Database(file);
	
	//Init
	
	reportError = function (err){
		console.log(err);
	};
	
	reportSuccess = function (){
		console.log("SUCCESS");
	};
	
	exports.submitEntry = function(params){
		var sql = 'INSERT INTO TASTES (TYPE, NAME, RATING) VALUES (?,?,?)';
		console.log(sql);
		adapter.connect(process.env.DATABASE_URL, function(err, client){
			var query = client.query(sql, [params.type, params.name, params.rating]);
			client.end();
		});
	};
	
	exports.getEntries = function(callback){
		var sql = 'SELECT ROWID, * FROM TASTES';
		console.log(sql);
		adapter.connect(process.env.DATABASE_URL, function(err, client){
			client.query(sql, callback);
			client.end();
			});
	};
