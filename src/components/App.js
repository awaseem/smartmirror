import React from 'react';
import Time from "./time/time";
import Weather from "./weather/weather";
import Spotify from "./spotify/spotify";
import Reddit from "./reddit/reddit";

export default React.createClass({
    getInitialState() {
        return {
            test: true
        }
    },
    returnSomething(something) {
        //this is only for testing purposes. Check /test/components/App-test.js
        return something;
    },
    turnOffWeather: function () {
        console.log("hello");
        this.setState({
            test: !this.state.test
        });
    },
    render() {
        var weather;
        if (this.state.test) {
            weather = <Weather mumble={this.props.mumble}/>;
        }
        else {
            weather = undefined;
        }
        return (
            <div className="ui fluid container">
                <div className="ui three column grid">
                    <div className="row">
                        <div className="column">
                            <Time/>
                        </div>
                        <div className="column"></div>
                        <div className="column">
                            {weather}
                        </div>
                    </div>
                    <div className="row"></div>
                    <div className="row">
                        <div className="column"></div>
                        <div className="column">
                            <Spotify mumble={this.props.mumble}/>
                            <Reddit/>
                        </div>
                        <div className="column"></div>
                    </div>
                </div>
            </div>
        )
    }
});
