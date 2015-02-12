var React = require('react'),
    mui = require('material-ui'),
    Paper = mui.Paper,
    Tabs = mui.Tabs,
    Tab = mui.Tab;

var UserStore = require('../../stores/user-store');
var ExtActions = require('../../actions/ext-actions');

var IdentityBody = require('./identity-body');


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
            ExtActions.getIdentities();
            UserStore.addChangeListener(this._onChange)
        },
        componentDidUnmount:function(){
            UserStore.removeChangeListener(this._onChange)
        },
        log:function(e,key,payload){
            console.log(arguments);
        },
        render: function (){

            var tabs = this.state.identities.map(function(identity){
                var body = <h1><IdentityBody identity={identity} /></h1>;

                return <Tab label={identity.organization} children={body}></Tab>
            }.bind(this));

            return (
            <Paper zDepth={1}>
                <Tabs>
                    {tabs}
                </Tabs>
                </Paper>
            )
        }

    });

module.exports = Identities;
