/** @jsx React.DOM */
var React = require('react');
var AppActions = require('../../actions/app-actions.js');
var ChangeIdentity =
    React.createClass({
        handleClick:function(){
            if(this.props.currentIdentity.organization !== this.props.identity.organization) {
                AppActions.changeIdentity(this.props.identity);
            }
        },
        render:function(){
            return <button className="btn btn-primary" onClick={this.handleClick}>Switch</button>
        }
    });
module.exports = ChangeIdentity;