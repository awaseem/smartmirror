/**
 * Created by awaseem on 15-11-05.
 */

import React from "react";
import keyID from "../../lib/IdGen";
import Forecast from "./forecast";

export default React.createClass({
    render: function () {
        let forecastItems = this.props.forecast.map((data) => {
            return <Forecast key={ keyID() } tempHigh={ data.high || "N/A" }
                             tempLow={ data.low || "N/A" } date={ data.date || "N/A" }
                             code={ data.code || "N/A" }/>;
        });
        return (
            <div className="ui center aligned grid">
                <div className="two column row">
                    <div className="column">
                        <i style={{fontSize: "56px"}} className={ this.props.conditionCode ? `wi wi-yahoo-${ this.props.conditionCode }` : `wi wi-na`}></i>
                    </div>
                    <div className="column">
                        <div className="ui huge header">{ this.props.temp || "N/A" }&deg;C</div>
                        <div className="ui huge header">{ this.props.city || "N/A" }</div>
                    </div>
                </div>
                {forecastItems}
            </div>
        );
    }
})
