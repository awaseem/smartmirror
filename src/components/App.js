import React from 'react';
import VelocityTransitionGroup from "velocity-react/velocity-transition-group";
import Mumble from "mumble-js";
import Time from "./time/time";
import Weather from "./weather/weather";
import Spotify from "./spotify/spotify";
import Reddit from "./reddit/reddit";
import Listener from "./listener/listener";

export default React.createClass({
    mumble: undefined,

    gotMatch: function () {
        this.setState({
            recognizeMatch: true
        })
    },

    getInitialState() {
        this.mumble = new Mumble({
            language: 'en-US',
            debug: true,
            callbacks: {
                recognizeMatch: this.gotMatch
            }
        });
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
    componentDidMount: function () {
        this.mumble.start();

        this.mumble.addCommand("hide", "sleep", () => {
            this.setState({
                hide: true
            });
        });
        this.mumble.addCommand("wake up", "wake up", () => {
            this.setState({
                hide: false
            })
        })
    },
    render() {
        var test;
        console.log(this.state.recognizeMatch);
        if (this.state.test) {
            test = <Spotify mumble={this.mumble}/>;
        }
        else {
            test = undefined;
        }
        return (
            <div>
                <VelocityTransitionGroup enter={{animation: "fadeIn"}} leave={{animation: "fadeOut"}}>
                    { !this.state.hide ? <div className="ui fluid container">
                        <div className="ui three column equal width grid">
                            <div className="row">
                                <div className="column">
                                    <Time/>
                                </div>
                                <div className="column">
                                    <Listener/>
                                </div>
                                <div className="column">
                                    <Weather mumble={this.mumble}/>
                                </div>
                            </div>
                            <div className="row"></div>
                            <div className="equal width row">
                                <div className="column">
                                    <Reddit mumble={this.mumble}/>
                                </div>
                                <div className="column"></div>
                                <div className="column">
                                    <Spotify mumble={this.mumble}/>
                                </div>
                            </div>
                        </div>
                    </div> : undefined }
                </VelocityTransitionGroup>
            </div>
        )
    }
});
