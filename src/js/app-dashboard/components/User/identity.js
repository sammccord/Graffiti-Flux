var React = require('react'),
    mui = require('material-ui'),
    Paper = mui.Paper,
    Tabs = mui.Tabs,
    Tab = mui.Tab;

var UserStore = require('../../stores/user-store');
var ExtActions = require('../../actions/ext-actions');

var IdentityBody = require('./identity-body');
var BodyShim = require('./body-shim');


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
        showBody:function(e,key,payload){
            console.log(arguments);
        },
        render: function (){
            var bodies = this.state.identities.map(function(identity,index){
                return <IdentityBody index={index} identity={identity} />;
            });

            var tabs = this.state.identities.map(function(identity){
                var body = <BodyShim identity={identity}/>;

                return <Tab label={identity.organization} children={body}>
                </Tab>
            }.bind(this));

            return (
            <Paper zDepth={1}>
                <Tabs onChange={this.showBody}>
                    {tabs}
                </Tabs>
                {bodies}
            </Paper>
            )
        }

    });

module.exports = Identities;
