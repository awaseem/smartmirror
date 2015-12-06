/**
 * Created by awaseem on 15-11-03.
 */

import React from "react";
import Snoocore from "snoocore";
import VelocityTransitionGroup from "velocity-react/velocity-transition-group";
import RedditInfo from "./redditInfo";
import redditConfig from "../../config/redditConfig";

let POST_LIMIT = 8;

export default React.createClass({
    reddit: new Snoocore(redditConfig),

    getFrontPageReddit: function (subReddit="worldnews") {
        // get information from the requested subreddit
        this.reddit(`/r/${subReddit}/hot`).get({ limit: POST_LIMIT})
            .then((results) => {
                this.setState({
                    redditData: results,
                    redditError: false
                });
            }).catch((error) => {
                console.error(error);
                this.setState({
                    redditError: true
                });
            });
    },

    getInitialState: function () {
        return {
            redditData: undefined,
            redditError: false
        };
    },

    componentDidMount: function () {
        let mumble = this.props.mumble;

        mumble.addCommand("get subreddit page", "what's new on (.+)", (subReddit) => {
            this.setState({
                redditData: undefined
            });
            // Make sure to remove the white space because subreddits do not have white space
            this.getFrontPageReddit(subReddit.replace(/ /g,''));
        });

        // get the hot world news page topics
        this.getFrontPageReddit();
    },

    componentWillUnmount: function () {
        this.props.mumble.removeCommand("get subreddit page");
    },

    render: function () {
        return (
            <div>
                <VelocityTransitionGroup enter={{animation: "fadeIn"}} leave={{animation: "fadeOut"}}>
                    {this.state.redditData ? <RedditInfo redditData={ this.state.redditData.data.children }/> : undefined }
                </VelocityTransitionGroup>
                <VelocityTransitionGroup enter={{animation: "fadeIn"}} leave={{animation: "fadeOut"}}>
                    {this.state.redditError ? <div className="ui huge header">Error could not load reddit information, please check logs!</div> : undefined }
                </VelocityTransitionGroup>
            </div>
        );
    }
});
