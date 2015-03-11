var React = require('react');
var mui = require('material-ui'),
    TextField = mui.TextField,
    RaisedButton = mui.RaisedButton;


var CommentForm =
    React.createClass({
        handleSubmit: function(e){
            e.preventDefault();
            var _id = this.props.sprayId;
            var text = document.getElementById(_id).value;
            if (!text) {
                return;
            }
            document.getElementById(_id).value = '';

            // TODO: send request to the server
            this.props.onCommentSubmit(text);
            this.refs.text.getDOMNode().value = '';
            return;
        },
        render: function(){
            return (
                <form className="graffiti-bind" onSubmit={this.handleSubmit}>
                    <TextField
                        className="graffiti-bind"
                        id={this.props.sprayId}
                        hintText="Leave a comment"
                        multiLine={true} ref="text"/>
                    <RaisedButton className="graffiti-bind" type="submit" label="Send" />
                </form>
            )
        }
    })

module.exports = CommentForm;
