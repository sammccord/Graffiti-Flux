var React = require('react');
var SprayStore = require('../../stores/spray-store');
var Comments = require('../Comments/app-comments');

function getComments(){
    return {
        comments:this.props.spray.comments
    };
}

var Spray =
    React.createClass({
        getInitialState: function(){
            return getComments().bind(this);
        },
        _onChange:function(){
            this.setState(getComments().bind(this));
        },
        componentWillMount:function(){
            SprayStore.addChangeListener(this._onChange)
        },
        render: function (){
            return (
                <li>
                    <h4>{this.props.spray.organization}</h4>
                    <h4>{this.props.spray.targetText}</h4>
                    <ul>
                        <Comments comments={this.state.comments}/>
                    </ul>

                </li>
            )
        }

    })

module.exports = Spray;