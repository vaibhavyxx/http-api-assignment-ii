const http = require('http');
const htmlHandler = require('./htmlResponses.js')
const jsonResponseHandler = require('./jsonResponses.js');
const port = process.env.PORT || process.env.NODE_PORT || 3000;

const handlePost = (request, response, parsedURL) => {

};

const handleGet = (request, response, parsedURL) => {
    switch(parsedURL.pathname){
        case '/style.css':
            htmlHandler.getStyle(request, response);
            break;
        case '/getUsers':
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