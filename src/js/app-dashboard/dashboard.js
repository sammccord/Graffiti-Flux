var React = require('react');
var injectTapEventPlugin = require("react-tap-event-plugin");

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();


var Identity = require('./components/User/identity');

var DASH =
    React.createClass({
        render:function(){
            return (
                <div>
                    <Identity />
                </div>
            )

        }
    });

module.exports = DASH;