/** @jsx React.DOM */
var React = require('react');
var mui = require('material-ui');

var ExtActions = require('../../actions/ext-actions');
var OrganizationStore = require('../../stores/organization-store');

var FlatButton = mui.FlatButton;
var TextField = mui.TextField;
var Paper = mui.Paper;

function OrganizationQuery (){
    return {
        foundOrg:OrganizationStore.foundOrg()
    }
}

var AddOrganization =
    React.createClass({
        getInitialState:function(){
            return OrganizationQuery();
        },
        _onChange:function(){
            this.setState(OrganizationQuery());
        },
        componentWillMount:function(){
            OrganizationStore.addChangeListener(this._onChange)
        },
        componentDidUnmount:function(){
            OrganizationStore.removeChangeListener(this._onChange)
        },
        handleSubmit:function(e){
            e.preventDefault();
            var code = document.getElementById('orgCode').value;
            if (!code) {
                return;
            }
            document.getElementById('orgCode').value = '';
            ExtActions.queryCode(code);
            return;
        },
        handleJoinGroup:function(e){
            e.preventDefault();
            var name = document.getElementById('joinAs').value;
            if (!name) {
                return;
            }
            console.log(this.state.foundOrg);
            ExtActions.addIdentity(this.state.foundOrg.name,name,this.state.foundOrg._id);
            this.setState({
                foundOrg:{}
            });
            return;
        },
        render:function(){
            var hide = this.state.foundOrg.name ? 'graffiti-show' : 'graffiti-hide';

            return <Paper className="addOrganization" zDepth={1}>
                <h4>Add a group</h4>
                <form onSubmit={this.handleSubmit}>
                    <TextField
                        id="orgCode"
                        hintText="Code"
                        disabled={this.state.foundOrg.name}
                        floatingLabelText="Code" />
                    <FlatButton className={!hide} type="submit" label="Submit" primary={true} />
                </form>
                <div className={hide}>
                    <h3>{this.state.foundOrg.name}</h3>
                    <p>{this.state.foundOrg.name ? this.state.foundOrg.pages.length:0} active pages</p>
                    <TextField
                        id="joinAs"
                        hintText="Join as"
                        floatingLabelText="Join as" />
                    <FlatButton onClick={this.handleJoinGroup} type="submit" label="Join" primary={true} />
                    </div>
            </Paper>
        }
    });
module.exports = AddOrganization;