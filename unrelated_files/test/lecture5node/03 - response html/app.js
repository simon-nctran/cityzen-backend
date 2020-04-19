/**
 * about rendering html as response
 * @type {module:http}
 */
var http = require('http');
var fs = require('fs');

function onRequest(req, res){
    res.writeHead(200, {'Content-type': 'text-plain'})
    // res.write('index.html');
    fs.readFile('./login.html', null, function (err, data) {
        if (err) {
            res.writeHead(404);
            res.write('File not found!');
        } else {
            res.write(data);
        }
        res.end();
    });
    // res.end();
}

http.createServer(onRequest).listen(3000);