/** @jsx React.DOM */
var APP = require('./components/app');
var DASHBOARD = require('./app-dashboard/dashboard');
var React = require('react');
var $ = require('jquery');

var link = document.createElement('link');
link.setAttribute('rel', 'stylesheet');
link.setAttribute('type', 'text/css');
link.setAttribute('href', "http://fonts.googleapis.com/css?family=Roboto:400,300,500");
document.getElementsByTagName('head')[0].appendChild(link);

var location = window.location.origin;

if(location.match(/(http:\/\/192\.168\.1\.24:9000)|(http:\/\/localhost:9000)|(http:\/\/graffiti\.herokuapp\.com)/)){
    $('.heroBox').detach();
    $('body').prepend('<div id="graffiti-dash"></div>');
    React.render(
        <DASHBOARD />,
        document.getElementById('graffiti-dash')
    )
}
else{
    $('body').prepend('<div id="graffiti-app"></div>');
    $('#graffiti-app').css({
        'font-family':'Roboto, sans-serif'
    });

    React.render(
        <APP />,
        document.getElementById('graffiti-app')
    );

}