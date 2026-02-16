let users = {};
const respond = (request, response, status, object) => {
    const content = JSON.stringify(object);
    response.writeHead(status, {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(content, 'utf8'),
    });

    if(request.method !== 'HEAD' && status !== 204){
        response.write(content);
    }
    response.end();
};

const getUsers = (request, response) => {
    const responseJSON = {users,};
    respond(request, response, 200, responseJSON);
}

const addUser = (request, response) => {
    const responseData = {
        message: 'Name and age are both required',
    };
    const {name, age} = request.body;
    if(!name || !age){
        responseData.id = 'missingParams';
        return respond(request, response, 400, responseData);
    }
    let responseStatus = 204;
    if(!users[name]){
        responseStatus = 201; //Created status
        users[name] = {
            name: name,
        };
    }
    
    users[name].age = age;
    if(responseStatus === 201){
        responseData.message = 'Created Successfully';
        return respond(request, response, responseStatus, responseData);
    }
    return respond(request, response, responseStatus, {});
};

const notFound = (request, response) => {
    const json = {
        message: "The page you are looking for is not found",
        id:'Not Found',
    }
    respond(request, response, 404, json);
};
module.exports = {addUser, getUsers, notFound};