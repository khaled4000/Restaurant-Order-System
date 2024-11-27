const HOST_URL = "https://deploy-test-xspm.onrender.com";;

const fetchData = async ({
    method = 'POST',
    api,
    reqBody = {},
    header = {},
    isFormData = false
}) => {
    let result = {};
    let url = `${HOST_URL}/${api}/`;

    let headers = {}
    if (header.token) headers['Authorization'] = `Bearer ${header.token}`

    let body
    if (isFormData) {
        body = new FormData();
        Object.keys(reqBody).forEach(key => {
            body.append(key, reqBody[key])
        })
    } else {
        headers['Content-Type'] = 'application/json';
        headers['Accept'] = 'application/json';
        body = JSON.stringify(reqBody);
    }

    let requestOptions = { method, headers, body };

    if (method.toUpperCase() === 'GET') {
        delete requestOptions.body;
    }

    try {
        let response = await fetch(url, requestOptions);
        result = await response.json();
        return result;
    } catch (e) {
        console.log("Error fetching data: ", e.message);
        return { success: false, error: e.message };
    }
}

export { fetchData };
