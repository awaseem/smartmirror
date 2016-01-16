import React from 'react';
import VelocityTransitionGroup from "velocity-react/velocity-transition-group";
import Mumble from "mumble-js";
import $ from "jquery";
import Time from "./time/time";
import Weather from "./weather/weather";
import Spotify from "./spotify/spotify";
import Reddit from "./reddit/reddit";
import Listener from "./listener/listener";
import Hue from "./hue/hue";

export default React.createClass({
    mumble: undefined,

    gotMatch: function (data) {
        console.log(data);
        this.setState({
            recognizeMatch: data.results[0][data.resultIndex].transcript
        });
        setTimeout( () => {
            this.setState({
                recognizeMatch: undefined
            });
        }, 2000);
    },

    getInitialState() {
        this.mumble = new Mumble({
            language: 'en-US',
            debug: true,
            continuous: false,
            callbacks: {
                recognizeMatch: this.gotMatch
            }
        });
        return {};
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
            });
        });

        // Remove scroll bar from the body
        $("body").css("overflow", "hidden");
    },

    render() {
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
                                    <Listener match={this.state.recognizeMatch}/>
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
                                <div className="column">
                                    <Hue mumble={this.mumble}/>
                                </div>
                                <div className="column">
                                    <Spotify mumble={this.mumble}/>
                                </div>
                            </div>
                            <div className="row"></div>
                        </div>
                        <h1 style={{ position: "fixed", bottom: "800px", right: "0", left: "0"}} className="ui center aligned huge header">Enjoy your day!</h1>
                    </div> : undefined }
                </VelocityTransitionGroup>
            </div>
        );
    }
});
