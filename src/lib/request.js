/**
 * Created by awaseem on 15-10-29.
 */

import $ from "jquery";

let statusMiddleware = (response) => {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
};

let jsonResponseMiddleware = (response) => {
    return response.json();
};

let Get = (url, jsonData) => {
    let urlQuery;
    if (jsonData) {
        urlQuery = `${url}?${$.param(jsonData)}`;
    }
    else {
        urlQuery = url;
    }
    return fetch(urlQuery, {
        method: "get"
    })
        .then(statusMiddleware)
        .then(jsonResponseMiddleware);
};

export { Get };
