var http = require('http');
var port = process.env.PORT || 3000;

http.createServer(function(req, res) {
    
    var ipaddress = req.headers['x-forwarded-for'] || 
        req.connection.remoteAddress || 
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress ||
        null;
        
    var software = req.headers['user-agent']
        .replace(/^[^\(]+\(/, "")
        .replace(/\).+$/, "")
        
    var language = req.headers['accept-language']
        .replace(/\,.+$/,"")
    
    var response = {
        ipaddress: ipaddress,
        language: language,
        software: software
    }
        
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(JSON.stringify(response))
}).listen(port)