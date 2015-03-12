/** @jsx React.DOM */
var React = require('react');
var mui = require('material-ui');

var ExtActions = require('../../actions/ext-actions');

var Paper = mui.Paper;
var FlatButton = mui.FlatButton;
var TextField = mui.TextField;
var Icon = mui.Icon;

var UserStore = require('../../stores/user-store');
var GroupStore = require('../../stores/group-store');

var ProfileItem = require('./profile-item');

function getIdentities () {
    return {
        identities:UserStore.getIdentities(),
        groups : GroupStore.getPublic()
    }
}

var Profile =
    React.createClass({
        getInitialState: function(){
            return getIdentities();
        },
        _onChange:function(){
            this.setState(getIdentities());
        },
        componentWillMount:function(){
            ExtActions.getPublic();
            UserStore.addChangeListener(this._onChange);
            GroupStore.addChangeListener(this._onChange);

        },
        componentDidUnmount:function(){
            UserStore.removeChangeListener(this._onChange);
            GroupStore.addChangeListener(this._onChange);
        },
        render:function(){
            var classStr = 'action-tabs';
            if(this.props.index > 0){
                classStr += ' graffiti-hide'
            }
            classStr += ' tab-'+this.props.index;

            var gs = this.state.groups.filter(function(g){
                var flag = true;
                this.state.identities.forEach(function(id){
                   if(id.organization_id === g._id) flag = false;
                });
                return flag;
            }.bind(this)).map(function(g){
                return <ProfileItem group={g}/>;
            });

            return (
                <div className={classStr}>
                    {gs}
                </div>
            )
        }
    });
module.exports = Profile;