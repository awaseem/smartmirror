/**
 * Created by awaseem on 15-11-03.
 */

import React from "react";
import Snoocore from "snoocore";
import redditConfig from "../../config/redditConfig";

let POST_LIMIT = 10;

export default React.createClass({
    reddit: new Snoocore(redditConfig),

    getInitialState: function () {
        return {
            redditData: undefined
        }
    },

    componentDidMount: function () {
        let mumble = this.props.mumble;
    },

    render: function () {
        this.reddit('/hot').get({ limit: POST_LIMIT }).then(function(result) {
            console.log(result);
        });
        return (
            <noscript/>
        )
    }
});

