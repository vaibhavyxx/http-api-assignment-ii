const fs = require('fs');
const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const style = fs.readFileSync(`${__dirname}/../client/style.css`);

const loadHTML = (request, response, type, page) => {
    response.writeHead(200, { 'Content-Type': type });
    response.write(page);
    response.end();
};
const getIndex = (request, response) => {
    loadHTML(request, response, 'text/html', index);
};

const getStyle = (request, response) => {
    loadHTML(request, response, 'text/css', style);
};

module.exports  = {
    getIndex, getStyle
};