/** @jsx React.DOM */
var React = require('react');
var mui = require('material-ui');

var ExtActions = require('../../actions/ext-actions');

var Paper = mui.Paper;
var RaisedButton = mui.RaisedButton;
var TextField = mui.TextField;
var Icon = mui.Icon;

var ProfileItem =
    React.createClass({
        getInitialState:function(){
          return {visible:false}
        },
        showJoin:function(){
            this.setState({visible:true});
        },
        addIdentity:function(e){
            var name = document.getElementById(this.props.group._id).value;
            document.getElementById(this.props.group._id).value = '';
            if (!name) {
                return;
            }
            ExtActions.addIdentity(this.props.group.name,name,this.props.group._id);
        },
        render:function(){
            var icon = <Icon icon="navigation-check" />
            var className = "row ";
            if(this.state.visible !== true) className+='graffiti-hide';
            return (
                <Paper className="profileItem" zDepth={1}>
                    <div className="row">
                        <div className="col-xs-6">
                            <h4>{this.props.group.name}</h4>
                        </div>
                        <div className="col-xs-6">
                            <RaisedButton onClick={this.showJoin} className={"pull-right"+(!this.state.visible?'':' graffiti-hide')} label="Join" secondary={true} />
                        </div>
                    </div>
                    <div className={className}>
                        <div className="col-xs-6">
                            <TextField
                                id={this.props.group._id}
                                hintText="Join as"
                                multiLine={false} ref="text"/>
                        </div>
                        <div className="col-xs-6">
                            <RaisedButton className="pull-right" onClick={this.addIdentity} label={icon} />
                        </div>
                    </div>
                </Paper>
            )
        }
    });
module.exports = ProfileItem;