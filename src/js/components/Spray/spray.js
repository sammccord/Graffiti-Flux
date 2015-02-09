var React = require('react');

var ExtActions = require('../../actions/ext-actions.js');

var SprayStore = require('../../stores/spray-store');
var PageStore = require('../../stores/page-store');

var Comments = require('../Comments/comments');
var CommentForm = require('../Comments/comment-form');

function getComments(){
    return {
        comments:this.props.spray.comments
    };
}

var Spray =
    React.createClass({
        getInitialState: function(){
            return getComments.bind(this)();
        },
        _onChange:function(){
            this.setState(getComments.bind(this)());
        },
        componentWillMount:function(){
            SprayStore.addChangeListener(this._onChange)
        },
        componentDidUnmount:function(){
            SprayStore.removeChangeListener(this._onChange);
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
                        <Comments comments={this.state.comments}/>
                    </ul>
                    <CommentForm onCommentSubmit={this.handleCommentSubmit}/>
                </li>
            )
        }

    })

module.exports = Spray;
