var React = require('react');
var $ = require('jquery');
var mui = require('material-ui'),
    TextField = mui.TextField,
    RaisedButton = mui.RaisedButton,
    Icon = mui.Icon;


var CommentForm =
    React.createClass({
        handleSubmit: function(e){
            e.preventDefault();
            var _id = this.props.sprayId;
            var text = document.getElementById(_id).value;
            $( "#"+_id ).trigger( "change" );
            if (!text) {
                return;
            }

            // TODO: send request to the server
            this.props.onCommentSubmit(text);
            //this.refs.text.getDOMNode().value = '';
            //this.refs.tf.getDOMNode().clearValue();
            this.refs.text.clearValue();
            $('textarea#'+_id).css('height','24px');
            return;
        },
        render: function(){
            return (
                <form className="graffiti-bind" onSubmit={this.handleSubmit}>
                    <TextField
                        ref="tf"
                        className="graffiti-bind"
                        id={this.props.sprayId}
                        hintText="Leave a comment"
                        multiLine={true} ref="text"/>
                    <RaisedButton className="graffiti-bind" type="submit" label="Reply" />
                </form>
            )
        }
    })

module.exports = CommentForm;
