var React = require('react');
var Replies = require('../Comments/replies');

var Comments =
    React.createClass({
        render: function (){
            var comments = this.props.comments.map(function(comment){
                return <li key={comment._id}>
                    <h4>{comment.user}</h4>
                    <p>{comment.text}</p>
                    <Replies replies={comment.replies}/>
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
