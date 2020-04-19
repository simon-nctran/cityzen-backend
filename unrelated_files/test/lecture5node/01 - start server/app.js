/**
 * listening port
 * @type {module:http}
 */
var http = require('http');
var faker = require('faker');

function onRequest(req, res){
    res.writeHead(200, {'Content-type': 'text-plain'})
    res.write('Hello world');
    res.end();
}

console.log("Hello, the server is on: port 3000!")

console.log("Emails");

for (let i = 0; i < 10; i++) {
    console.log(faker.internet.email());
}

console.log("Cities");
for (let i = 0; i < 10; i++) {
    console.log(faker.address.city());
}

http.createServer(onRequest).listen(3000);