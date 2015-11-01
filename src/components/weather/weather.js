/**
 * Created by awaseem on 15-10-29.
 */
import React from "react";
import VelocityTransitionGroup from "velocity-react/velocity-transition-group";
import Config from "../../config/config";
import { Get } from "../../lib/request";
import Forecast from "./forecast";
import keyID from "../../lib/IdGen";

let weatherApiEndpoint = "https://query.yahooapis.com/v1/public/yql";

let createWeatherQuery = (city) => {
    return `select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="${city}") and u='c'`;
};

let getWeatherForCity = function (city) {
    Get(weatherApiEndpoint, {
        q: createWeatherQuery(city),
        format: "json"
    })
    .then((data) => {
        this.setState({
            weatherData: data.query.results.channel
        });
    })
    .catch((error) => {
        this.setState({
            weatherError: true
        })
    })
};

export default React.createClass({
    getInitialState: function () {
        return {
            weatherError: false
        }
    },

    componentDidMount: function () {
        // Initial load should get the weather for my city
        getWeatherForCity.bind(this, "calgary")();

        // Add voice actions for mumble
        this.props.mumble.addCommand("weather", "Show me weather for (.+)", (city) => {
            getWeatherForCity.bind(this, city)();
        });
    },

    componentWillUnmount: function () {
        this.props.mumble.removeCommand("weather");
    },

    render: function () {
        let weatherData = this.state.weatherData;
        if (weatherData) {
            let forecastItems;
            let forecast = this.state.weatherData.item.forecast;
            if (forecast) {
                forecastItems = forecast.map((data) => {
                    return <Forecast key={ keyID() } tempHigh={ data.high || "N/A" }
                        tempLow={ data.low || "N/A" } date={ data.date || "N/A" } code={ data.code || "N/A" }/>;
                });
            }
            return (
                <VelocityTransitionGroup enter={{animation: "fadeIn"}} leave={{animation: "fadeOut"}} runOnMount={true}>
                <div className="ui center aligned grid">
                    <div className="two column row">
                        <div className="column">
                            <i style={{fontSize: "56px"}} className={weatherData.item.condition.code?`wi wi-yahoo-${weatherData.item.condition.code}`:`wi wi-na`}></i>
                        </div>
                        <div className="column">
                            <div className="ui huge header">{ weatherData.item.condition.temp || "N/A" }&deg;C</div>
                            <div className="ui huge header">{ weatherData.location.city || "N/A" }</div>
                        </div>
                    </div>
                    {forecastItems}
                </div>
                </VelocityTransitionGroup>
            );
        }
        return <noscript/>
    }
});
