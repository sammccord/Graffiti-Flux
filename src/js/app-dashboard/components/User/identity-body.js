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
        changeName:function(e){
            e.preventDefault();
            var userName = document.getElementById(this.props.identity.organization_id).value;
            if (!userName) {
                return;
            }
            ExtActions.addIdentity(this.props.identity.organization,userName,this.props.identity.organization_id);
            this.setState({
                disabled:true
            });
            return;
        },
        setDefault:function(){
            ExtActions.setDefaultIdentity(this.props.identity.organization,this.props.identity.name,this.props.identity.organization_id);
            console.log(this.props.identity.organization,this.props.identity.name,this.props.identity.organization_id);
        },
        render:function(){
            var showClass = this.state.disabled ? 'graffiti-hide' : 'graffiti-show';
            var hideClass = !this.state.disabled ? 'graffiti-hide' : 'graffiti-show';

            var classStr = 'user-organizations';
            if(this.props.index > 0){
                classStr += ' graffiti-hide'
            }
            console.log('render body',this.props.identity.organization_id);
            classStr += ' '+this.props.identity.organization_id;

            return <div className={classStr}>
                <form onSubmit={this.changeName}>
                    <TextField
                        id={this.props.identity.organization_id}
                        hintText="Disabled Hint Text"
                        disabled={this.state.disabled}
                        defaultValue={this.props.identity.name}
                        floatingLabelText="Username" />
                    <FlatButton className={showClass} type="submit" label="Submit" primary={true} />
                    <Icon className={hideClass} onClick={this.unlockUsername} icon="action-settings" />
                </form>
                <FlatButton onClick={this.setDefault} label="Set Default" primary={true} />
            </div>
        }
    });
module.exports = IdentityBody;