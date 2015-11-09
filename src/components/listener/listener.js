/**
 * Created by awaseem on 15-11-06.
 */

import React from "react";

export default React.createClass({
    getInitialState: function () {
        return {
            test: false
        };
    },

    componentDidMount: function () {
        console.log(this.props.mumble)
    },

    render: function () {
        return (
            <div>
                <div className="ui center aligned grid">
                    <div className="row">
                        <div className="ui huge header">Listening</div>
                        { this.state.test ? "hello world" : undefined}
                    </div>
                </div>
            </div>
        );
    }
});