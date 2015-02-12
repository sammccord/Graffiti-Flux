var React = require('react');
var mui = require('material-ui'),
    TextField = mui.TextField,
    FlatButton = mui.FlatButton;

var UserStore = require('../../stores/user-store');

function getCurrentIdentity(){
    return {
        current_identity: UserStore.getCurrentIdentity()
    };
}

var CommentForm =
    React.createClass({
        getInitialState: function(){
            return getCurrentIdentity();
        },
        _onChange:function(){
            this.setState(getCurrentIdentity());
        },
        componentWillMount:function(){
            UserStore.addChangeListener(this._onChange);
        },
        componentDidUnmount:function(){
            UserStore.removeChangeListener(this._onChange);
        },
        handleSubmit: function(e){
            e.preventDefault();
            var _id = this.props.sprayId;
            var text = document.getElementById(_id).value;
            if (!text) {
                return;
            }
            document.getElementById(_id).value = '';

            // TODO: send request to the server
            this.props.onCommentSubmit(this.state.current_identity.name,text);
            this.refs.text.getDOMNode().value = '';
            return;
        },
        render: function(){

            return (
                <form onSubmit={this.handleSubmit}>
                    <TextField
                        id={this.props.sprayId}
                        hintText="Leave a comment"
                        multiLine={true} ref="text"/>
                    <FlatButton type="submit" label="Submit" primary={true} />
                </form>
            )
        }
    })

module.exports = CommentForm;
