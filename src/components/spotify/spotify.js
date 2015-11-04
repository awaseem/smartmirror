/**
 * Created by awaseem on 15-11-01.
 */

import React from "react";
import Spotify from "spotify-web-api-js";
import VelocityTransitionGroup from "velocity-react/velocity-transition-group";
import TrackMetaDisplay from "./trackInfo";
import checkNested from "../../lib/checkNested";

export default React.createClass({
    currentTrack: new Audio(),

    spotifySearch: new Spotify(),

    getInitialState: function () {
        return {
            trackPlaying: undefined
        }
    },

    componentDidMount: function () {
        let track;
        let mumble = this.props.mumble;
        mumble.addCommand("play track", "play (.+) by (.+)", (song, artist) => {
            this.spotifySearch.searchTracks(`artist:${artist} track:${song}`)
                .then((data) => {
                    console.log(data);
                    if (checkNested(data, "tracks", "items")) {
                        let trackMeta = data.tracks.items[0];
                        if (!trackMeta.preview_url) {
                            throw "Track does not have a preview url!";
                        }
                        this.currentTrack.src = trackMeta.preview_url;
                        this.currentTrack.play();
                        this.setState({ trackPlaying: trackMeta });
                        this.currentTrack.onended = () => {
                            this.setState({ trackPlaying: undefined });
                        };
                    }
                    else {
                        console.error("Could not find track!");
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        });
        mumble.addCommand("stop track", "pause", () => {
            if (track) {
                track.pause();
                this.setState({ trackPlaying: undefined });
            }
        });
    },

    componentWillUnmount: function () {
        let mumble = this.props.mumble;
        mumble.removeCommand("play track");
        mumble.removeCommand("stop track");
    },

    render: function () {
        let trackMeta = this.state.trackPlaying;
        let trackDisplay;
        if (trackMeta) {
            trackDisplay = <TrackMetaDisplay trackMeta={trackMeta}/>;
        }
        return (
            <div>
                <VelocityTransitionGroup enter={{animation: "fadeIn"}} leave={{animation: "fadeOut"}} runOnMount={true}>
                    {trackDisplay}
                </VelocityTransitionGroup>
            </div>
        );
    }
});