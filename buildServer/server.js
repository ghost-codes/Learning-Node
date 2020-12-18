const http = require('http');

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);

    //dealing with responses
    res.setHeader('Content-type', 'text/html');

    res.write('<h1>hello ,world</h1>');
    res.write('<h2>hello again,world</h2>');
    res.end();
});

server.listen(3000, 'localhost', () => {
    console.log("listening for requests on port 3000");
});