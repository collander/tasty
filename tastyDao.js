	//Imports
	var fs = require('fs');
	var adapter = require('pg');
	
	//Fields
	var file = "tasting.db";
	var config;
	fs.readFile('./config', function(err, data){
		config = JSON.parse(data);
	});
	//Init
	
	reportError = function (err){
		console.log(err);
	};
	
	reportSuccess = function (){
		console.log("SUCCESS");
	};
	
	exports.submitEntry = function(params){
		var sql = 'INSERT INTO TASTES (TYPE, NAME, RATING) VALUES (?,?,?);';
		console.log(sql);
		adapter.connect(config.pgurl, function(err, client){
			if (err){
				console.log(err);
			}
			var query = client.query(sql, [params.type, params.name, params.rating], function(err){
				if (err){
					console.log(err);
				}
				client.end();
			});
			
			
		});
	};
	
	exports.getEntries = function(callback){
		var sql = 'SELECT * FROM TASTES;';
		console.log(sql);
		adapter.connect(config.pgurl, function(err, client){
			if (err){
				console.log(err);
			}
			console.log('connected');
			client.query(sql, function(err, data){
				if (err){
					console.log(err);
				}
				client.end();
				callback(data.rows);
			});
			console.log('queried');
		});
	};
