/** @jsx React.DOM */
var React = require('react');
var Catalog = require('../components/app-catalog');
var Cart = require('../components/app-cart');
var Identity = require('../components/app-identity');
var Page = require('../components/app-page');

var APP =
    React.createClass({
        render:function(){
           return (
               <div>
                    <h1>Let's Shop</h1>
                    <Catalog />
                   <Cart />
                   <h1>Graffiti</h1>
                    <Page />
                   <Identity />
               </div>
               )

        }
    });
module.exports = APP;