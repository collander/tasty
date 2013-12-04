
var __dirname = './';

var http = require('http');

var server = http.createServer(function (req, res){
	res.writeHead(200, {"Content-Type": "text/plain"});
	res.send("Hello World\n");
});
server.listen(8000);
