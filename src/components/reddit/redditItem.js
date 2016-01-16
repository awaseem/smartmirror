/**
 * Created by awaseem on 15-11-05.
 */

import React from "react";

export default React.createClass({

    render: function () {
        return (
            <div className="row">
                <div className="ui tiny header">
                    { this.props.title }
                </div>
            </div>
        );
    }
    
});
