var React = require('react');

var moment = require('moment');
var Replies = require('../Comments/replies');

var Comments =
    React.createClass({
        render: function (){
            var comments = this.props.comments.map(function(comment){
                var date = new Date(comment.createdAt);

                return <li className="SprayComment graffiti-bind" key={comment._id}>
                    <b className="commentAuthor">{comment.user} </b>
                    <span className="muted">{moment(date).from(new Date())}</span>
                    <p>{comment.text}</p>

                </li>;
            });
            return (
                <ul className="graffiti-bind">
                    {comments}
                </ul>
            )
        }

    });

module.exports = Comments;
