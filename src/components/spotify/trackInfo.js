/**
 * Created by awaseem on 15-11-03.
 */

import React from "react";

export default React.createClass({
    render: function () {
        let trackMeta = {
            song: this.props.trackMeta.name,
            artist: this.props.trackMeta.artists[0].name,
            albumImage: this.props.trackMeta.album.images[0].url
        };
        return (
            <div className="ui center aligned grid">
                <div className="row">
                    <div className="ui huge header">Now Playing</div>
                </div>
                <div className="row">
                    <div className="ui small circular image">
                        <img src={trackMeta.albumImage}/>
                    </div>
                </div>
                <div className="row">
                    <div className="ui huge header">{trackMeta.song}</div>
                </div>
                <div className="row">
                    <div className="ui large header">{trackMeta.artist}</div>
                </div>
            </div>
        );
    }
});