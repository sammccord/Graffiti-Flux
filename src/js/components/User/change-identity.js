/** @jsx React.DOM */
var React = require('react');
var AppActions = require('../../actions/actions.js');
var ChangeIdentity =
    React.createClass({
        handleClick:function(){
            AppActions.changeIdentity(this.props.identity);
        },
        render:function(){
            return <button onClick={this.handleClick}>Switch</button>
        }
    });
module.exports = ChangeIdentity;