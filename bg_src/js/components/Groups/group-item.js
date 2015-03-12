/** @jsx React.DOM */
var React = require('react');
var mui = require('material-ui');

var ExtActions = require('../../actions/ext-actions');

var Paper = mui.Paper;
var FlatButton = mui.FlatButton;
var TextField = mui.TextField;
var Icon = mui.Icon;

var GroupItem =
    React.createClass({
        toggleVisibility:function(){
          //console.log(this.props.gId);
            ExtActions.toggleGroup(this.props.group.organization_id);
        },
        render:function(){

            var icon;

            if(this.props.group.active){
                icon = "toggle-check-box";
            }
            else{
                icon = "toggle-check-box-outline-blank";
            }

            return (
                <Paper zDepth={1}>
                    <div className="row group-toggle">
                        <div className="col-xs-3">
                            <h1 onClick={this.toggleVisibility} className="toggle-icon">
                                <Icon icon={icon} />
                            </h1>
                        </div>
                        <div className="col-xs-9">
                            <h3>{this.props.group.organization}</h3>
                            <span className="muted">{this.props.group.name}</span>
                        </div>
                    </div>
                </Paper>
            )
        }
    });
module.exports = GroupItem;