/**
 * Created by awaseem on 15-11-17.
 */

import React from "react";
import hueConfig from "../../config/hueConfig";

export default React.createClass({
    getInitialState: function () {
        this.hue = jsHue();
        this.bridge = this.hue.bridge(hueConfig.bridgeIP);
        this.user = this.bridge.user(hueConfig.bridgeUser);
        return {
            lightState: undefined
        }
    },
    componentDidMount: function () {
        let mumble = this.props.mumble;
        // All possible color states for the smartmirror
        mumble.addCommand("light color control", "change lights to (.+)", (color) => {
            switch (color.toLowerCase()) {
                case "red":
                    this.user.setGroupState(hueConfig.groupId, hueConfig.red , success, error);
                    break;
                case "green":
                    this.user.setGroupState(hueConfig.groupId, hueConfig.green, success, error);
                    break;
                case "blue":
                    this.user.setGroupState(hueConfig.groupId, hueConfig.blue, success, error);
                    break;
                case "pink":
                    this.user.setGroupState(hueConfig.groupId, hueConfig.pink, success, error);
                    break;
                case "normal":
                    this.user.setGroupState(hueConfig.groupId, hueConfig.normal, success, error);
                    break;
                default:
                    // If no matches the trigger and error and set the lights color to undefined
                    error("no light color found")
            }
            let self = this;
            // Call back function for the handling of our color states
            function success() {
                self.setState({
                    lightState: color
                })
            }
            function error(err) {
                console.error(err);
                self.setState({
                    lightState: undefined
                })
            }
        });

        mumble.addCommand("lights off", "lights off", () => {
            this.user.setGroupState(hueConfig.groupId, { on: false}, function (data) {}, function (err) {});
        });

        mumble.addCommand("lights on", "lights on", () => {
            this.user.setGroupState(hueConfig.groupId, { on: true}, function (data) {}, function (err) {});
        });

        mumble.addCommand("light dim", "lower lights", () => {
            this.user.setGroupState(hueConfig.groupId, { on: true, bri: 50}, function (data) {}, function (err) {});
        })
    },
    render: function () {
        return (
            <div></div>
        )
    }
});