var React = require('react');

var PageStore = require('../../stores/page-store');

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
        _onChange:function(){
            this.setState(getPage());
        },
        componentWillMount:function(){
            PageStore.addChangeListener(this._onChange)
        },
        componentDidUnmount:function(){
            PageStore.removeChangeListener(this._onChange);
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
