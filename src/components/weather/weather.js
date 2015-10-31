/**
 * Created by awaseem on 15-10-29.
 */
import React from "react";
import Config from "../../config/config";
import $ from "jquery";
import { Get } from "../../lib/request";

let weatherApiEndpoint = "https://query.yahooapis.com/v1/public/yql";

let createWeatherQuery =  (city) => {
    return `select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="${city}")`;
};

console.log(createWeatherQuery("calgary"));

export default React.createClass({
    getInitialState: function () {
        Get(weatherApiEndpoint, {
            q: createWeatherQuery("calgary"),
            format: "json"
        }).then((data) => {
            console.log(data);
        })
            .catch((error) => {
                console.log(error);
            })
    },
    render: function () {
        return(<h1>This is a test</h1>);
    }
});
