var React = require('react');
var PageStore = require('../stores/page-store');
var UserStore = require('../stores/user-store');


function getPage(){
    return {
        page:PageStore.getPageState(),
        filter:UserStore.getCurrentIdentity()
    };
}

var Page =
    React.createClass({
        getInitialState: function(){
            return getPage();
        },
        _onChange:function(){
            this.setState(getPage())
        },
        componentWillMount:function(){
            UserStore.addChangeListener(this._onChange)
        },
        render: function (){

            return (
                <div>
                    {this.state.page._id}<br />
                    {this.state.page.pageRef}<br />
                    {this.state.filter.organization}
                </div>
            )
        }

    })

module.exports = Page;