/** @jsx React.DOM */
var React = require('react');
var mui = require('material-ui');

var $ = require('jquery');

var BodyShim =
    React.createClass({
        render:function(){
            $('.user-organizations').addClass('graffiti-hide');
            $('.'+this.props.identity.organization_id).removeClass('graffiti-hide');

            console.log(this.props.identity);
            return <div className="graffiti-hide"></div>
        }
    });
module.exports = BodyShim;