var React = require('react');

var ExtActions = require('../../actions/ext-actions');

var PageStore = require('../../stores/page-store');
var UserStore = require('../../stores/user-store');

var Sprays = require('../Spray/sprays');


function getPage(){
    return {
        page:PageStore.getPageState()
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
                    {this.state.page.ref}<br />
                    <Sprays />
                </div>
            )
        }

    });

module.exports = Page;
