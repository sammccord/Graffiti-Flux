/** @jsx React.DOM */
var React = require('react');
var mui = require('material-ui');

var ExtActions = require('../../actions/ext-actions');

var FlatButton = mui.FlatButton;
var TextField = mui.TextField;
var Icon = mui.Icon;

var Profile =
    React.createClass({
        render:function(){
            var classStr = 'action-tabs';
            if(this.props.index > 0){
                classStr += ' graffiti-hide'
            }
            classStr += ' tab-'+this.props.index;

            return <div className={classStr}>

            </div>
        }
    });
module.exports = Profile;