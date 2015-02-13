var React = require('react');
var UserStore = require('../../stores/user-store');
var SprayStore = require('../../stores/spray-store');

var Spray = require('./spray');
var FreshSpray = require('./fresh-spray');


function getSprays(){
    return {
        sprays:SprayStore.getSprays()
    };
}

var Sprays =
    React.createClass({
        getInitialState: function(){
            return getSprays();
        },
        _onChange:function(){
            this.setState(getSprays());
        },
        componentWillMount:function(){
            SprayStore.addChangeListener(this._onChange);
        },
        componentDidUnmount:function(){
            SprayStore.removeChangeListener(this._onChange);
        },
        render: function (){
            var sprays = this.state.sprays.map(function(spray){
                return <Spray key={spray._id} spray={spray} />
            });

            return (
                <div>
                        <FreshSpray />
                        {sprays}
                </div>
            )
        }

    });

module.exports = Sprays;
