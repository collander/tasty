var express= require('express');
var fs = require('fs');
var doT = require('express-dot');


var tastyDao = require('./tastyDao.js');

var config;
fs.readFile('./config', function(err, data){
	config = JSON.parse(data);
	});
var __dirname = './';
var app = express();

//Set up Express to serve doT views
app.configure(function(){
	app.use(express.bodyParser());
	app.set('views', __dirname+'/view/');
	app.set('view engine', 'doT');
	app.engine('html', doT.__express);
});

//Serve public folder for static content
app.use('/public', express.static(__dirname+'/public'));

//get handlers
app.get('/', function(req, res){
	var entries = tastyDao.getEntries(
			function(entries){
				console.log('rendering');
				res.render('index.html', {entries: entries});
			});
});
app.get('/addEntry.html', function(req, res){
	res.render('addEntry.html');
});

app.post('/submitEntry.html', function(req, res){
	console.log(req.body);
	tastyDao.submitEntry(req.body);
	res.redirect('/');
});

app.listen(process.env.PORT || 8080);
