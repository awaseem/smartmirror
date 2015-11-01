import React from 'react';
import Weather from "./weather/weather";

export default React.createClass({
    returnSomething(something) {
        //this is only for testing purposes. Check /test/components/App-test.js
        return something;
    },
    render() {
        return (
            <div className="ui three column grid">
                <div className="row">
                    <div className="column"></div>
                    <div className="column"></div>
                    <div className="column">
                        <Weather/>
                    </div>
                </div>
            </div>
        )
    }
});
