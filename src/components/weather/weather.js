/**
 * Created by awaseem on 15-10-29.
 */
import React from "react";
import Config from "../../config/config";
import { Get } from "../../lib/request";
import Forecast from "./forecast";

let weatherApiEndpoint = "https://query.yahooapis.com/v1/public/yql";

let createWeatherQuery =  (city) => {
    return `select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="${city}") and u='c'`;
};

export default React.createClass({
    getInitialState: function () {
        return {
            weatherError: false,
            weatherLoading : true
        }
    },

    componentDidMount: function () {
        Get(weatherApiEndpoint, {
            q: createWeatherQuery("calgary"),
            format: "json"
        })
            .then((data) => {
                this.setState({
                    weatherLoading: false,
                    weatherData: data.query.results.channel
                });
            })
            .catch((error) => {
                this.setState({
                    weatherError: true
                })
            })
    },

    render: function () {
        console.log(this.state.weatherData);
        let weatherData = this.state.weatherData;
        if (!weatherData) {
            return ( <h1>Loading</h1> );
        }
        else {
            let forecastItems;
            let forecast = this.state.weatherData.item.forecast;
            if (forecast) {
                forecastItems = forecast.map((data) => {
                    return <Forecast tempHigh={ data.high || "N/A" } tempLow={ data.low || "N/A" } date={ data.date || "N/A" }/>;
                })
            }
            return (
                <div className="ui center aligned grid">
                    <div className="two column row">
                        <div className="column">
                            <i style={{fontSize: "56px"}} className="wi wi-night-sleet"></i>
                        </div>
                        <div className="column">
                            <div className="ui huge header">{ weatherData.item.condition.temp || "N/A" }&deg;C</div>
                            <div className="ui huge header">{ weatherData.location.city || "N/A" }</div>
                        </div>
                    </div>
                    {forecastItems}
                </div>
            );
        }
    }
});
