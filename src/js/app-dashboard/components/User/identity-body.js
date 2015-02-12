/** @jsx React.DOM */
var React = require('react');
var mui = require('material-ui');

var ExtActions = require('../../actions/ext-actions');

var FlatButton = mui.FlatButton;
var TextField = mui.TextField;
var Icon = mui.Icon;

var IdentityBody =
    React.createClass({
        getInitialState:function (){
            return {
                disabled: true
            }
        },
        unlockUsername:function(){
            this.setState({
                disabled:false
            })
        },
        handleSubmit:function(){

        },
        render:function(){
            var showHideClass = this.state.disabled ? 'graffiti-hide' : 'graffiti-show';

            return <div>
                <form onSubmit={this.handleSubmit}>
                    <TextField
                        hintText="Disabled Hint Text"
                        disabled={this.state.disabled}
                        defaultValue={this.props.identity.name}
                        floatingLabelText="Username" />
                    <FlatButton className={showHideClass} type="submit" label="Submit" primary={true} />
                    <Icon onClick={this.unlockUsername} icon="action-settings" />
                </form>
                <h1>{this.props.identity.organization_id}</h1>
                <FlatButton label="Set Default" primary={true} />
            </div>
        }
    });
module.exports = IdentityBody;