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