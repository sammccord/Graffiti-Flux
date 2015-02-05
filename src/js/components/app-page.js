var React = require('react');
var PageStore = require('../stores/page-store');
var UserStore = require('../stores/user-store');

var Sprays = require('../components/app-sprays');


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
        render: function (){
            return (
                <div>
                    {this.state.page._id}<br />
                    {this.state.page.pageRef}<br />
                    <Sprays organization={this.state.filter.organization} />
                </div>
            )
        }

    });

module.exports = Page;