var React = require('react'),
    mui = require('material-ui'),
    DropDownMenu = mui.DropDownMenu;


var UserStore = require('../../stores/user-store');
var ChangeIdentity = require('./change-identity');
var ExtActions = require('../../actions/ext-actions');


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

            var filterOptions = this.state.identities.map(function(identity){
                console.log(identity);
                return {
                    payload:identity.organization_id,
                    text:identity.organization
                }
            }.bind(this));

            var selectedIndex;

            filterOptions.forEach(function(identity,index){
                if(identity.payload === this.state.current_identity.organization_id){
                    selectedIndex = index;
                }
            }.bind(this));
            console.log(filterOptions);

            return (
                <DropDownMenu onChange={this.log} menuItems={filterOptions} selectedIndex={selectedIndex}/>
            )
        }

    })

module.exports = Identities;
