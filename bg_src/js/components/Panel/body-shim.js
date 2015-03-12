/** @jsx React.DOM */
var React = require('react');
var mui = require('material-ui');

var $ = require('jquery');

var BodyShim =
    React.createClass({
        render:function(){
            $('.action-tabs').addClass('graffiti-hide');
            $('.tab-'+this.props.index).removeClass('graffiti-hide');

            return <div className="graffiti-hide"></div>
        }
    });
module.exports = BodyShim;