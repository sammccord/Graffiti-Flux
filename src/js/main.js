/** @jsx React.DOM */

var APP = require('./components/app');
var React = require('react');
var $ = require('jquery');

$('body').prepend('<div id="graffiti-app"></div>');

React.render(
    <APP />,
    document.getElementById('graffiti-app')
);