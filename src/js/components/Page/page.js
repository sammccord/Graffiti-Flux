var React = require('react');
var $ = require('jquery');

var ExtActions = require('../../actions/ext-actions');

var PageStore = require('../../stores/page-store');
var UserStore = require('../../stores/user-store');

var Sprays = require('../Spray/sprays');

function getPage(){
    return {
        page:PageStore.getPageState(),
        identities:UserStore.getIdentities()
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
        componentDidMount:function(){
          $('body').prepend('<div id="graffiti-scrollbar-binder"></div>');
            $('#graffiti-scrollbar-binder').on('mouseenter',function(){
                this.expandTabs();
            }.bind(this)).on('mouseleave',function(){
                this.shrinkTabs();
            }.bind(this))
        },
        expandTabs:function(){
            $('.graffiti-spray').addClass('graffiti-highlight');
            $('.spray-tab').addClass('graffiti-expanded');
        },
        shrinkTabs:function(){
            $('.graffiti-spray').removeClass('graffiti-highlight');
            $('.spray-tab').removeClass('graffiti-expanded graffiti-focus');
        },
        componentWillMount:function(){
            ExtActions.getIdentities();
            UserStore.addChangeListener(this._onChange);
            PageStore.addChangeListener(this._onChange)
        },
        componentDidUnmount:function(){
            UserStore.removeChangeListener(this._onChange);
            PageStore.removeChangeListener(this._onChange);
        },
        render: function (){
                return (
                    <Sprays />
                        )
        }

    });

module.exports = Page;
