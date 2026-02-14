const  handleResponse = async (response) => {
    const content = document.querySelector('#content');
    let phrase = "";
    switch(response.status){
        case 200:
            phrase = `<b>Success</b>`
            break;
        case 201:
            phrase = `<b>Created</b>`
            break;
        case 204:
            phrase = `<b>Updated (No Content)</b>`
            break;
        case 400:
            phrase = `<b>Bad Request</b>`
            break;
        default:
            phrase = `Error code not implemented`
            break;
    }
    content.innerHTML = phrase;
    const obj = await response.json();  //parses response to json
    if(obj.message) content.innerHTML += `<p>${obj.message}</p>`;
}

const sendPost = async(nameForm) => {
    
    const url = nameForm.getAttribute('action');
    const method = nameForm.getAttribute('method');

    const name = nameForm.querySelector('#nameField').value;
    const age = nameForm.querySelector('#ageField').value;
    const dataType = 'application/json';//nameForm.querySelector('#dataType').value;

    let formData = `name=${name}&age=${age}`;
    formData = JSON.stringify({name, age});

    const response = await fetch(url, {
        method: method,
        headers:{
            'Content-Type': dataType,
            'Content-Length': formData.length,
            'Accept': dataType,
        },
        body: formData,
    });
    handleResponse(response);
}

const init = () => {
    const nameForm = document.querySelector('#nameForm');
    const addUser = (e) => {
        e.preventDefault();
        sendPost(nameForm);
        return false;
    }
    nameForm.addEventListener('submit', addUser);
};

window.onload = init;