/** @jsx React.DOM */
var APP = require('./components/app');
var React = require('react');
var $ = require('jquery');

String.prototype.replaceCallback= function(regex,string,cb){
    var ret = String.prototype.replace.call(this,regex,string);
    if(typeof cb === 'function'){
        cb.call(ret); // Call your callback
    }
    return ret;  // For chaining
};

var link = document.createElement('link')
link.setAttribute('rel', 'stylesheet')
link.setAttribute('type', 'text/css')
link.setAttribute('href', "http://fonts.googleapis.com/css?family=Roboto:400,300,500");
document.getElementsByTagName('head')[0].appendChild(link);

$('body').prepend('<div id="graffiti-app"></div>');
$('#graffiti-app').css({
    position:'fixed',
    'font-family':'Roboto, sans-serif'
});

React.render(
    <APP />,
    document.getElementById('graffiti-app')
);
