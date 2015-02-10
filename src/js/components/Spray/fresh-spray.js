var React = require('react');

var ExtActions = require('../../actions/ext-actions');

var PageStore = require('../../stores/page-store');
var UserStore = require('../../stores/user-store');
var $ = require('jquery');

function getFormData(){
    return {
        page: PageStore.getPageState(),
        user: UserStore.getCurrentIdentity()
    };
}

function createPageAddFreshSpray(page_ref,targetText,name,text){
    ExtActions.createPageAddFreshSpray(page_ref,targetText,name,text);
}

function addFreshSpray(page_id,targetText,name,text){
    ExtActions.addSpray(page_id,targetText,name,text);
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
            var text = this.refs.text.getDOMNode().value.trim();
            if (!text || !$('#graffiti-spray').length) {
                return;
            }
            var targetText = document.getElementById('graffiti-spray').getAttribute('data-graffiti-target');
            console.log(targetText);
            $('#graffiti-spray').contents().unwrap();

            // TODO: send request to the server
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
                <form onSubmit={this.handleSubmit}>
                    <input placeholder="Initialize with a comment" type="text" ref="text" />
                    <button className="btn btn-default" type="submit">Submit</button>
                </form>
            )
        }
    })

module.exports = FreshSpray;
