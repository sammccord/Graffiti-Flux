var React = require('react');
var $ = require('jquery');

var PageStore = require('../../stores/page-store');

var Sprays = require('../Spray/sprays');


function getPage(){
    return {
        page:PageStore.getPageState()
    };
}

function bindSelection(){
    $('p:not(#graffiti-app *)').addClass('graffiti-selectable');
    $('.graffiti-selectable').on('selectstart', function() {
        $('.createSpray').removeClass('graffiti-visible');
        $('#graffiti-spray').contents().unwrap();
        $(document).one('mouseup', function(e) {
            var selection = window.getSelection();
            if (selection.type === "Range") {
                var string = selection.toString();
                // var formatted = string.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
                var formatted = string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
                var regex = new RegExp("(" + formatted + ")", "gm");
                $(selection.focusNode.parentNode).contents().filter(function() {
                    return this.nodeType === 3;
                }).each(function() {
                    $(this).replaceWith($(this).text().replaceCallback(regex, '<span id="graffiti-spray" data-graffiti-target="' + string + '">$1</span>',function(){
                        $('#graffiti-app,html').addClass('graffiti-show');
                    }));
                });


            }
        });
    });
}

var Page =
    React.createClass({
        getInitialState: function(){
            bindSelection();
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
                    <Sprays />
                </div>
            )
        }

    });

module.exports = Page;
