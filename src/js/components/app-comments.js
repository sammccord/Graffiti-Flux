var React = require('react');
var Replies = require('../components/app-replies');

var Comments =
    React.createClass({
        render: function (){
            var comments = this.props.comments.map(function(comment){
                return <li key={Math.random().toString()}>
                    <h4>{comment.name}</h4>
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