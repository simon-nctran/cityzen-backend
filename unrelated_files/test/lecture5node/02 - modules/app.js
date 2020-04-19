/**
 * modules and exports
 * @type {module:http}
 */
var http = require('http');

var module1 = require('./module1');
var module2 = require('./module2');

function onRequest(req, res){
    res.writeHead(200, {'Content-type': 'text-plain'})
    res.write(module1.myString);
    module1.myFunction();
    res.write(module2.myString);
    module2.myFunction();
    res.end();
}

http.createServer(onRequest).listen(3000);