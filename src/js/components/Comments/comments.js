var React = require('react');

var moment = require('moment');
var Replies = require('../Comments/replies');

var Comments =
    React.createClass({
        render: function (){
            var comments = this.props.comments.map(function(comment){
                var date = new Date(comment.createdAt);

                console.log(moment(date).from(new Date()));

                return <li className="SprayComment" key={comment._id}>
                    <b className="commentAuthor">{comment.user} </b>
                    <span className="muted">{moment(date).from(new Date())}</span>
                    <p>{comment.text}</p>

                </li>;
            });
            return (
                <ul>
                    {comments}
                </ul>
            )
        }

    });

module.exports = Comments;
