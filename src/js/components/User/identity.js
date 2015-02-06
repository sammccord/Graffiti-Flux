var React = require('react');
var UserStore = require('../../stores/user-store');
var ChangeIdentity = require('./change-identity');


function getIdentities(){
    return {
        current_identity: UserStore.getCurrentIdentity(),
        identities:UserStore.getIdentities()
    };
}

var Identities =
    React.createClass({
        getInitialState: function(){
            return getIdentities();
        },
        _onChange:function(){
            this.setState(getIdentities())
        },
        componentWillMount:function(){
            UserStore.addChangeListener(this._onChange)
        },
        componentDidUnmount:function(){
            UserStore.removeChangeListener(this._onChange)
        },
        render: function (){
            var identities = this.state.identities.map(function(identity){
                return <li key={Math.random().toString()}>
                    <b>{identity.organization}</b> - {identity.name}&nbsp;
                    <ChangeIdentity currentIdentity={this.state.current_identity} identity={identity}>Switch</ChangeIdentity>
                </li>
            }.bind(this));

            return (
                <div>
                    <h3><b>{this.state.current_identity.organization}</b> - {this.state.current_identity.name}</h3>
                    <ul>
                    {identities}
                    </ul>
                </div>
            )
        }

    })

module.exports = Identities;