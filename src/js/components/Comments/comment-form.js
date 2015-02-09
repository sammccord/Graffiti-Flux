var React = require('react');

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
            var text = this.refs.text.getDOMNode().value.trim();
            if (!text) {
                return;
            }
            // TODO: send request to the server
            this.props.onCommentSubmit(this.state.current_identity.name,text);
            this.refs.text.getDOMNode().value = '';
            return;
        },
        render: function(){

            var formProps = {
                placeholder: 'Leave a comment',
                type: 'text',
                ref: 'text'
            };

            return (
                <form onSubmit={this.handleSubmit}>
                    <input placeholder="Leave a comment" type="text" ref="text" />
                    <button type="submit">Submit</button>
                </form>
            )
        }
    })

module.exports = CommentForm;
