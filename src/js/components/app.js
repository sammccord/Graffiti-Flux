/** @jsx React.DOM */
var React = require('react');
var Identity = require('../components/User/app-identity');
var Page = require('../components/app-page');

var APP =
    React.createClass({
        render:function(){
           return (
               <div>
                   <h1>Graffiti</h1>
                   <Identity />
                    <Page />
               </div>
               )

        }
    });
module.exports = APP;