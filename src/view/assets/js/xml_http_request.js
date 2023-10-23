var HttpClient = function () {
    this.get = function (url, user_x_key = null, token = null, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function () {
            if (anHttpRequest.readyState == 4 && (anHttpRequest.status >= 200 && anHttpRequest.status <= 299))
                aCallback(JSON.parse(anHttpRequest.responseText));

            if (anHttpRequest.readyState == 4 && (anHttpRequest.status >= 400 && anHttpRequest.status <= 499))
                aCallback(JSON.parse(anHttpRequest.responseText));

            if (anHttpRequest.readyState == 4 && (anHttpRequest.status >= 500 && anHttpRequest.status <= 599))
                aCallback(JSON.parse(anHttpRequest.responseText));

        }

        anHttpRequest.open("GET", url, true);
        anHttpRequest.withCredentials = true;
        anHttpRequest.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        anHttpRequest.setRequestHeader("user-x-key", user_x_key);
        anHttpRequest.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        anHttpRequest.setRequestHeader('Access-Control-Allow-Origin', '*');
        anHttpRequest.setRequestHeader("Accept", "application/json");
        anHttpRequest.setRequestHeader('Authorization', 'Bearer ' + token);
        anHttpRequest.send(null);

    }
}

var HttpClientPost = function () {
    this.get = function (url, data, user_x_key = null, token = null, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function () {
            if (anHttpRequest.readyState == 4 && (anHttpRequest.status >= 200 && anHttpRequest.status <= 299))
                aCallback(JSON.parse(anHttpRequest.responseText));

            if (anHttpRequest.readyState == 4 && (anHttpRequest.status >= 400 && anHttpRequest.status <= 499))
                aCallback(JSON.parse(anHttpRequest.responseText));

            if (anHttpRequest.readyState == 4 && (anHttpRequest.status >= 500 && anHttpRequest.status <= 599))
                aCallback(JSON.parse(anHttpRequest.responseText));
        }

        anHttpRequest.open("POST", url, true);
        anHttpRequest.withCredentials = true;
        anHttpRequest.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        anHttpRequest.setRequestHeader("user-x-key", user_x_key);
        anHttpRequest.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        anHttpRequest.setRequestHeader('Access-Control-Allow-Origin', '*');
        anHttpRequest.setRequestHeader("Accept", "application/json");
        anHttpRequest.setRequestHeader('Authorization', 'Bearer ' + token);
        anHttpRequest.send(data);
    }
}

function serializeForm(form) {
    let rawData = new FormData(form);
    let data = {};

    for (let pair of rawData.entries()) {
        data[pair[0]] = pair[1];
    }

    // data['_token'] = csrf
    return JSON.stringify(data);
}

// function serializeForm(form) {
//     var formData = {};
//     for (var field of form.elements) {
//         if (field.name) {
//             formData[field.name] = field.value;
//         }
//     }
//     return JSON.stringify(formData);
// }


function logForm(data) {
    for (let [key, value] of data) { console.log(`${key}: ${value}`) }
}