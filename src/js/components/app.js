/** @jsx React.DOM */
var React = require('react');
var Catalog = require('../components/app-catalog');
var Cart = require('../components/app-cart');
var APP =
    React.createClass({
        render:function(){
           return (
               <div>
                    <h1>Let's Shop</h1>
                    <Catalog />
                   <Cart />
               </div>
               )

        }
    });
module.exports = APP;