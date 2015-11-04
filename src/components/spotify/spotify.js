/**
 * Created by awaseem on 15-11-01.
 */

import React from "react";
import Spotify from "spotify-web-api-js";

export default React.createClass({
    spotifySearch: new Spotify(),

    getInitialState: function () {
        return {
            trackPlaying: false
        }
    },

    componentDidMount: function () {
        let mumble = this.props.mumble;
        let track;
        mumble.addCommand("play track", "play (.+) by (.+)", (song, artist) => {
            this.spotifySearch.searchTracks(`artist:${artist} track:${song}`)
                .then((data) => {
                    let trackPreviewUrl = data.tracks.items[0].preview_url;
                    if (trackPreviewUrl) {
                        track = new Audio(trackPreviewUrl);
                        track.play();
                        track.onended = () => {
                            this.setState({ trackPlaying: false });
                        };
                        this.setState({ trackPlaying: true });
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        });
        mumble.addCommand("stop track", "pause", () => {
            if (track) {
                track.pause();
                this.setState({ trackPlaying: false });
            }
        });
    },

    componentWillUnmount: function () {
        let mumble = this.props.mumble;
        mumble.removeCommand("play track");
        mumble.removeCommand("stop track");
    },

    render: function () {
        return (<noscript/>)
    }
});