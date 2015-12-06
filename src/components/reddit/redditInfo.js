/**
 * Created by awaseem on 15-11-05.
 */

import React from "react";
import RedditItem from "./redditItem";
import keyID from "../../lib/IdGen";

export default React.createClass({
    render: function () {
        let redditItems = this.props.redditData.map((item) => {
            return <RedditItem key={ keyID() } title={ item.data.title } image={ item.data.thumbnail ? item.data.thumbnail: "http://thebutton.divshot.io/img/reddit.png" }/>;
        });
        return (
            <div className="ui grid">
                {redditItems}
            </div>
        );
    }
});
