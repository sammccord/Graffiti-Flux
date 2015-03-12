var React = require('react');
var mui = require('material-ui'),
    RaisedButton = mui.RaisedButton,
    FlatButton = mui.FlatButton,
    Icon = mui.Icon,
    Paper = mui.Paper;

var GroupButton =
    React.createClass({
        render: function() {
            var button;

            //console.log(this.props.active);
            if (this.props.active) {
                button = (
                    <FlatButton linkButton={true} href="https://github.com/callemall/material-ui" secondary={true}>
                        <FontIcon className="muidocs-icon-custom-github example-flat-button-icon"/>
                        <span className="mui-flat-button-label">Github</span>
                    </FlatButton>
                )
            }
            else {
                button = (
                    <RaisedButton linkButton={true} href="https://github.com/callemall/material-ui" secondary={true}>
                        <FontIcon className="muidocs-icon-custom-github example-button-icon"/>
                        <span className="mui-raised-button-label example-icon-button-label">Github</span>
                    </RaisedButton>
                )
            }

            return button;
        }

    });

module.exports = GroupButton;