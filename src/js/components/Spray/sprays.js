var React = require('react');
var UserStore = require('../../stores/user-store');
var SprayStore = require('../../stores/spray-store');
var $ = require('jquery');

var Spray = require('./spray');
var FreshSpray = require('./fresh-spray');

function findUpClass(el, className) {
    while (el.parentNode) {
        el = el.parentNode;
        if (el.classList && el.classList.contains(className)){
            return el;
        }
    }
}

function handlePageClicks (){
    $('body').click(function(e) {
        if(e.target.classList.contains('spray-tab')){
            $('.graffiti-comments-container').removeClass('graffiti-show');
            $('[data-spray-container="'+$(e.target).attr('data-spray-id')+'"]').addClass('graffiti-show');
        }
        else if($('.graffiti-comments-container.graffiti-show,.freshSprayContainer.graffiti-show').length){
            if(!findUpClass(e.target,'graffiti-bind')){
                $('.graffiti-comments-container,.freshSprayContainer').removeClass('graffiti-show');
            }
        }
    });
}

function getSprays(){
    return {
        sprays:SprayStore.getSprays()
    };
}

var Sprays =
    React.createClass({
        getInitialState: function(){
            handlePageClicks();
            return getSprays();
        },
        _onChange:function(){
            this.setState(getSprays());
        },
        componentWillMount:function(){
            SprayStore.addChangeListener(this._onChange);
        },
        componentDidUnmount:function(){
            SprayStore.removeChangeListener(this._onChange);
        },
        render: function (){
            var sprays = this.state.sprays.map(function(spray){
                return <Spray key={spray._id} spray={spray} />
            });

            return (
                <div className="graffiti-bind">
                        <FreshSpray />
                        {sprays}
                </div>
            )
        }

    });

module.exports = Sprays;
