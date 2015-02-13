var React = require('react');

var ExtActions = require('../../actions/ext-actions');

var mui = require('material-ui'),
    TextField = mui.TextField,
    FlatButton = mui.FlatButton,
    Paper = mui.Paper;

var PageStore = require('../../stores/page-store');
var UserStore = require('../../stores/user-store');
var $ = require('jquery');

function getFormData(){
    return {
        page: PageStore.getPageState(),
        user: UserStore.getCurrentIdentity()
    };
}

function createPageAddFreshSpray(org_id,page_ref,targetText,name,text){
    console.log(org_id);
    ExtActions.createPageAddFreshSpray(org_id,page_ref,targetText,name,text);
}

function addFreshSpray(page_id,targetText,user,text){
    ExtActions.addSpray(page_id,targetText,user,text);
}

var FreshSpray =
    React.createClass({
        getInitialState: function(){
            return getFormData();
        },
        _onChange:function(){
            this.setState(getFormData());
        },
        componentWillMount:function(){
            PageStore.addChangeListener(this._onChange);
            UserStore.addChangeListener(this._onChange);
        },
        componentDidUnmount:function(){
            PageStore.removeChangeListener(this._onChange);
            UserStore.removeChangeListener(this._onChange);
        },
        handleSubmit: function(e){
            e.preventDefault();
            var text = document.getElementById('freshSprayInput').value;
            document.getElementById('freshSprayInput').value = '';
            if (!text || !$('#graffiti-spray').length) {
                return;
            }
            var targetText = document.getElementById('graffiti-spray').getAttribute('data-graffiti-target');
            $('#graffiti-spray').contents().unwrap();

            if(this.state.page.fresh === true){
                createPageAddFreshSpray(this.state.user.organization_id,this.state.page.ref,targetText,this.state.user.name,text);
            }
            else{
                addFreshSpray(this.state.page._id,targetText,this.state.user.name,text);
            }

            this.refs.text.getDOMNode().value = '';
            return;
        },
        render: function(){
            return (
                <Paper className="freshSprayContainer" zDepth={1}>
                    <form onSubmit={this.handleSubmit}>
                        <TextField
                            id="freshSprayInput"
                            hintText="Leave a comment"
                            multiLine={true} ref="text"/>
                        <FlatButton className="freshSpraySubmit" type="submit" label="Tag and Comment" primary={true} />
                    </form>
                </Paper>
            )
        }
    });

module.exports = FreshSpray;
