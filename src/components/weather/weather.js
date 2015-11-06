/**
 * Created by awaseem on 15-10-29.
 */

import React from "react";
import VelocityTransitionGroup from "velocity-react/velocity-transition-group";
import { Get } from "../../lib/request";
import WeatherInfo from "./weatherInfo";

let weatherApiEndpoint = "https://query.yahooapis.com/v1/public/yql";

export default React.createClass({
    getInitialState: function () {
        return {
            weatherError: false
        }
    },

    createWeatherQuery: function (city) {
        return `select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="${city}") and u='c'`;
    },

    getWeatherForCity: function (city) {
        Get(weatherApiEndpoint, {
            q: this.createWeatherQuery(city),
            format: "json"
        })
            .then((data) => {
                this.setState({
                    weatherData: data.query.results.channel
                });
            })
            .catch((error) => {
                console.error(error);
                this.setState({
                    weatherError: true
                })
            })
    },

    componentDidMount: function () {
        // Add voice actions for mumble
        this.props.mumble.addCommand("weather", "Show me weather for (.+)", (city) => {
            this.getWeatherForCity(city);
        });

        // Initial load should get the weather for my city
        this.getWeatherForCity("calgary");
    },

    componentWillUnmount: function () {
        // remove the voice commands when the component leaves the DOM
        this.props.mumble.removeCommand("weather");
    },

    render: function () {
        let weatherData = this.state.weatherData;
        return (
            <div>
                <VelocityTransitionGroup enter={{animation: "fadeIn"}} leave={{animation: "fadeOut"}}>
                    { weatherData ? <WeatherInfo forecast={ weatherData.item.forecast }
                                                 conditionCode={ weatherData.item.condition.code }
                                                 temp={ weatherData.item.condition.temp }
                                                 city={ weatherData.location.city }/> : undefined }
                </VelocityTransitionGroup>

                <VelocityTransitionGroup enter={{animation: "fadeIn"}} leave={{animation: "fadeOut"}}>
                    { this.state.weatherError ? <div className="ui huge header">Error could not load data</div> : undefined }
                </VelocityTransitionGroup>
            </div>
        );
    }
});
