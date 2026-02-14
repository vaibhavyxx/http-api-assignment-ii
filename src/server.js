const http = require('http');
const htmlHandler = require('./htmlResponses.js')
const jsonHandler = require('./jsonResponses.js');
const port = process.env.PORT || process.env.NODE_PORT || 3000;

const parseBody = (request, response, handler) => {
    const body = [];
    request.on('eeror', (err) => {
        console.dir(err);
        response.statusCode = 400;
        response.end();
    });

    request.on('data', (chunk) =>{ 
        body.push(chunk);
    });

    request.on('end', ()=> {
        const bodyString = Buffer.concat(body).toString();
        request.body = JSON.parse(bodyString);
        handler(request, response);
    });
}

const handlePost = (request, response, parsedURL) => {
    if(parsedURL.pathname === '/addUser'){
        parseBody(request, response, jsonHandler.addUser);
    }
};

const handleGet = (request, response, parsedURL) => {
    switch(parsedURL.pathname){
        case '/style.css':
            htmlHandler.getStyle(request, response);
            break;
        case '/getUsers':
            jsonHandler.getUsers(request, response);
            break;
        default:
            htmlHandler.getIndex(request, response);
            break;
    }
}

const onRequest = (request, response) => {
    const protocol = request.connection.encrypted? 'https': 'http';
    const parsedURL = new URL(request.url, `${protocol}://${request.headers.host}`);

    if(request.method === 'POST') handlePost(request, response, parsedURL);
    else handleGet(request, response, parsedURL);
}
http.createServer(onRequest).listen(port, () => {
    console.log(`Server is running on port ${port}`);
});