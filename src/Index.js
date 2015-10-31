import React from 'react';
import App from './components/App';
import Mumble from "mumble-js";

let mumble = new Mumble({
    language: 'en-US',
    debug: true
});

mumble.start();

window.React = React;

React.render(
    <App mumble={mumble}/>
    , document.getElementById('content')
);
