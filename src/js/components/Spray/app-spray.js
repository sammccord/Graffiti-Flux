var React = require('react');
var Comments = require('../components/Comments/app-comments');

var Spray =
    React.createClass({
        render: function (){
            return (
                <li>
                    <h4>{this.props.spray.organization}</h4>
                    <h4>{this.props.spray.targetText}</h4>
                    <ul>
                        <Comments comments={this.props.spray.comments}/>
                    </ul>
                </li>
            )
        }

    })

module.exports = Spray;