/** @jsx React.DOM */
var React = require('react');
var mui = require('material-ui');

var ExtActions = require('../../actions/ext-actions');

var Paper = mui.Paper;
var FlatButton = mui.FlatButton;
var TextField = mui.TextField;
var Icon = mui.Icon;

var UserStore = require('../../stores/user-store');

var GroupItem = require('./group-item');

function getIdentities () {
    return {
        identities:UserStore.getIdentities()
    }
}

var Groups =
    React.createClass({
        getInitialState: function(){
            return getIdentities();
        },
        _onChange:function(){
            this.setState(getIdentities());
        },
        componentWillMount:function(){
            ExtActions.getIdentities();
            UserStore.addChangeListener(this._onChange);
        },
        componentDidUnmount:function(){
            UserStore.removeChangeListener(this._onChange);
        },
        render:function(){
            var classStr = 'action-tabs';
            if(this.props.index > 0){
                classStr += ' graffiti-hide'
            }
            classStr += ' tab-'+this.props.index;

            var groups = this.state.identities.map(function(identity){
                return <GroupItem group={identity}/>
            });

            return (
                    <div className={classStr}>
                        {groups}
                    </div>
            )
        }
    });
module.exports = Groups;