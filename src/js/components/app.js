/** @jsx React.DOM */
var React = require('react');
var Identity = require('../components/User/identity');
var Page = require('../components/Page/page');
var current_page = '';

current_page = '';

var APP =
    React.createClass({
        render:function(){
            if (document.domain.replace(/\./g, '+') + window.location.pathname.replace(/\//g, '+') === current_page) return false;
            current_page = document.domain.replace(/\./g, '+') + window.location.pathname.replace(/\//g, '+');
           return (
               <div className="overflow">
                   <Identity />
                   <Page />
               </div>
               )

        }
    });

module.exports = APP;
