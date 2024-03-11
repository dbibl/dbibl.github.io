import FetchService from './service/FetchService.js';

/*-- Objects --*/
const fetchService = new FetchService();
/*-- /Objects --*/

/*--Functions--*/
async function submitForm(e, form) {
    // 1. Prevent reloading page
    e.preventDefault();
    // 2. Submit the form
    // 2.1 User Interaction
    const btnSubmit = document.getElementById('btnSubmit');
    btnSubmit.disabled = true;
    setTimeout(() => btnSubmit.disabled = false, 2000);
    // 2.2 Build JSON body
    const jsonFormData = buildJsonFormData(form);
    // 2.3 Build Headers
    const headers = buildHeaders();
    // 2.4 Request & Response
    const response = await fetchService.performPostHttpRequest(`https://jsonplaceholder.typicode.com/posts`, headers, jsonFormData); // Uses JSON Placeholder
    // const response = await fetchService.performPostHttpRequest(`https://vhx6uxqfq1.execute-api.us-west-1.amazonaws.com/dev/log`, headers, jsonFormData);
    console.log(response);
    // 2.5 Inform user of result
    if(response) {
        // window.location = `/success.html?FirstName=${response.FirstName}&LastName=${response.LastName}&Email=${response.Email}&id=${response.id}`;
        // window.location = `/success.html?prediction=${response.prediction}`;
        // alert(JSON.stringify(response))
        // var jsonStr = JSON.stringify(response);
        // document.body.innerHTML = jsonStr;
        // document.getElementById("json").textContent = JSON.stringify(response.prediction, undefined, 2);
        // var myObj = JSON.parse(response);
        // document.getElementById("name").innerHTML = myObj.data.name;
        var t = JSON.parse(JSON.stringify(response));
        document.getElementById("json").textContent =t.log;
//        document.getElementById("json").textContent =t.prediction;
    }
    else
        alert(`An error occured.`);
}

function buildHeaders(authorization = null) {
    const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Requested-With',
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": 'DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT',
        "Access-Control-Allow-Credentials": true// Required for cookies, authorization headers with HTTPS
    };
    return headers;
}

function buildJsonFormData(form) {
    const jsonFormData = { };
    for(const pair of new FormData(form)) {
        jsonFormData[pair[0]] = pair[1];
    }
    return jsonFormData;
}
/*--/Functions--*/

/*--Event Listeners--*/
const sampleForm = document.querySelector("#sampleForm");
if(sampleForm) {
    sampleForm.addEventListener("submit", function(e) {
        submitForm(e, this);
    });
}
/*--/Event Listeners--*/
