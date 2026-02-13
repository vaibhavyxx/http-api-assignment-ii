const http = require('http');
const jsonResponseHandler = require('./src/jsonResponseHandler');
const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {}

const onRequest = (request, response) => {
    
}
http.createServer(onRequest).listen(port, () => {
    console.log(`Server is running on port ${port}`);
});