/**
 * Created by awaseem on 15-11-06.
 */

import React from "react";
import VelocityTransitionGroup from "velocity-react/velocity-transition-group";

export default React.createClass({
    render: function () {
        return (
            <div>
                <div className="ui center aligned grid">
                    <div className="row">
                        <div className="ui huge header">{ this.props.match ? "Recognized Match" : "Listening" }</div>
                    </div>
                    <VelocityTransitionGroup enter={{animation: "fadeIn"}} leave={{animation: "fadeOut"}}>
                        {   this.props.match ?
                            <div>
                                <div className="row">
                                    <div className="ui large header">{ `"${this.props.match}"` }</div>
                                </div>
                            </div> : undefined
                        }
                    </VelocityTransitionGroup>
                </div>
            </div>
        );
    }
});