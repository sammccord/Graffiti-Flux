var React = require('react');

var Replies =
    React.createClass({
        render: function (){
            var replies;
            if(this.props.replies && this.props.replies.length){
                replies = this.props.replies.map(function(reply){
                    return <li>
                        <h4>{reply.name}</h4>
                        <p>{reply.text}</p>
                    </li>
                })
            }
            return (
                <ul>
                    {replies}
                </ul>
            )
        }

    })

module.exports = Replies;