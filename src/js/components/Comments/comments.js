var React = require('react');

var marked = require('marked');
marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: false,
    breaks: true,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false
});

var moment = require('moment');
var Replies = require('../Comments/replies');

var CommentForm = require('./comment-form');

var ExtActions = require('../../actions/ext-actions');

var Comments =
    React.createClass({
        handleCommentSubmit: function(text){
            ExtActions.addComment(this.props.sprayId,this.props.name,text);
        },
        render: function (){

            var comments = this.props.comments.map(function(comment){
                var date = new Date(comment.createdAt);
                var rawMarkup = marked(comment.text);

                return <li className="SprayComment graffiti-bind" key={comment._id}>
                    <b className="commentAuthor">{comment.user} </b>
                    <span className="muted">{moment(date).from(new Date())}</span>
                    <span className="commentText" dangerouslySetInnerHTML={{__html: rawMarkup}}></span>

                </li>;
            });

            var classStr = 'graffiti-bind action-tabs';
            if(this.props.index > 0){
                classStr += ' graffiti-hide'
            }
            classStr += ' tab-'+this.props.index;

            return (
                <div className={classStr}>
                    <CommentForm sprayId={this.props.sprayId} onCommentSubmit={this.handleCommentSubmit}/>
                    <ul>
                    {comments}
                    </ul>
                </div>
            )
        }

    });

module.exports = Comments;
