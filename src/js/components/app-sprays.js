var React = require('react');
var UserStore = require('../stores/user-store');
var SprayStore = require('../stores/spray-store');

var Spray = require('../components/app-spray');


function getSprays(organization){
    console.log(organization);
    return {
        sprays:SprayStore.getSprays(organization)
    };
}

var Sprays =
    React.createClass({
        getInitialState: function(){
            return getSprays(this.props.organization);
        },
        _onChange:function(){
            this.setState(getSprays(UserStore.getCurrentIdentity().organization));
        },
        componentWillMount:function(){
            UserStore.addChangeListener(this._onChange);
        },
        render: function (){
            var sprays = this.state.sprays.map(function(spray){
                return <Spray key={Math.random().toString()} spray={spray} />
            });

            return (
                <div>
                        <ul>
                            {sprays}
                        </ul>
                </div>
            )
        }

    })

module.exports = Sprays;