/** @jsx React.DOM */
var React = require('react');
var mui = require('material-ui');

var ExtActions = require('../../actions/ext-actions');

var Paper = mui.Paper;
var FlatButton = mui.FlatButton;
var TextField = mui.TextField;
var Icon = mui.Icon;

var ProfileItem =
    React.createClass({
        render:function(){
            return (
                <Paper zDepth={1}>
                    <div className="row">
                        <div className="col-xs-8">
                            <h5>{this.props.group.name}</h5>
                        </div>
                        <div className="col-xs-4">
                        </div>
                    </div>
                </Paper>
            )
        }
    });
module.exports = ProfileItem;