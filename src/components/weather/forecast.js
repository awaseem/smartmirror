/**
 * Created by awaseem on 15-10-31.
 */

import React from "react";

export default React.createClass({
    render: function () {
        return (
            <div className="three column row">
                <div className="column">
                    <i className={this.props.code?`wi wi-yahoo-${this.props.code}`:`wi wi-na`}></i>
                </div>
                <div className="column">
                    <div className="ui tiny header">{this.props.date}</div>
                </div>
                <div className="column">
                    <div className="ui tiny header">{this.props.tempHigh}&deg;C/{this.props.tempLow}&deg;C</div>
                </div>
            </div>
        );
    }
})