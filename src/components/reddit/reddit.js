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

    getFrontPageReddit: function (subReddit) {
        // get information from the requested subreddit
        this.reddit(subReddit ? `/r/${subReddit}/hot`: "/hot").get({ limit: POST_LIMIT})
            .then((results) => {
                this.setState({
                    redditData: results
                })
            }).catch((error) => {
                console.error(error);
                this.setState({
                    redditError: error
                })
            })
    },

    getInitialState: function () {
        return {
            redditData: undefined
        }
    },

    componentDidMount: function () {
        let mumble = this.props.mumble;

        mumble.addCommand("reddit", "what's new (.+)", (subReddit) => {
            this.setState({
                redditData: undefined
            });
            // Make sure to remove the white space because subreddits do not have white space
            this.getFrontPageReddit(subReddit.replace(/ /g,''));
        });

        // get the hot front page topics
        this.getFrontPageReddit();
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

