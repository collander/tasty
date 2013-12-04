var http = require('http');

console.log("creating Server");
var server = http.createServer(function (req, res){
	res.writeHead(200, {"Content-Type": "text/plain"});
	res.end("Hello World\n");
	console.log("server created");

});
console.log("listening to port 8080");
server.listen(8080);
