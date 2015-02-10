var React = require('react');
var $ = require('jquery');

var ExtActions = require('../../actions/ext-actions.js');

var SprayStore = require('../../stores/spray-store');
var PageStore = require('../../stores/page-store');

var Comments = require('../Comments/comments');
var CommentForm = require('../Comments/comment-form');

function setSprayState(){
    return {
        spray:this.props.spray
    };
}

function highlightSpray(spray) {
        console.log('HEY');
        // var formatted = spray.targetText.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
        var formatted = spray.targetText.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        var regex = new RegExp("(" + formatted + ")", "gm")

        $('p.graffiti-selectable:not(#graffiti-app *)').contents().filter(function () {
            return this.nodeType === 3;
        }).each(function () {
            $(this).replaceWith($(this).text().replace(regex, '<span class="graffiti-spray" data-graffiti-id="' + spray._id + '">$1</span>'));
        });
}

var Spray =
    React.createClass({
        getInitialState: function(){
            return setSprayState.bind(this)();
        },
        _onChange:function(){
            this.setState(setSprayState.bind(this)());
        },
        componentWillMount:function(){
            SprayStore.addChangeListener(this._onChange)
        },
        componentDidUnmount:function(){
            SprayStore.removeChangeListener(this._onChange);
        },
        componentDidMount:function(){
            highlightSpray(this.state.spray);
        },
        handleCommentSubmit: function(user,text){
            var spray_id = this.props.spray._id;
            ExtActions.addComment(spray_id,user,text);
        },
        render: function (){
            return (
                <li>
                    <h4>{this.props.spray.organization}</h4>
                    <h4>{this.props.spray.targetText}</h4>
                    <ul>
                        <Comments comments={this.state.spray.comments}/>
                    </ul>
                    <CommentForm onCommentSubmit={this.handleCommentSubmit}/>
                </li>
            )
        }

    })

module.exports = Spray;
