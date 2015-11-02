/**
 * Created by awaseem on 15-11-01.
 */

import React from "react";
import moment from "moment";
import VelocityTransitionGroup from "velocity-react/velocity-transition-group";

let refreshInterval = 60000;
let timeFormat = "h:mm A";
let dateFormat = "dddd, MMMM Do YYYY";

export default React.createClass({
    getInitialState: function () {
        return {
            time: moment().format(timeFormat),
            date: moment().format(dateFormat)
        }
    },

    componentDidMount: function () {
        setInterval(() => {
            this.setState({
                time: moment().format(timeFormat),
                date: moment().format(dateFormat)
            });
        }, refreshInterval)
    },

    render: function () {
        return (
            <VelocityTransitionGroup enter={{animation: "fadeIn"}} leave={{animation: "fadeOut"}} runOnMount={true}>
                <div style={{ fontSize: "84px" }} className="ui huge header">{this.state.time}</div>
                <div className="ui large header">{this.state.date}</div>
            </VelocityTransitionGroup>
        );
    }
});
