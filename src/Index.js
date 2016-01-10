import React from 'react';
import ReactDOM from 'react-dom';
import Mumble from "mumble-js";
import App from './components/App';
import { test } from "./components/listener/listenerUtils";

window.React = React;

ReactDOM.render(
    <App/>, document.getElementById('content')
);
