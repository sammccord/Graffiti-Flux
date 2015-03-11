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
var retries = 0;
var injected = false;
var observer;

var target = document.querySelector('body');

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
    $('#graffiti-app,#graffiti-app *,.spray-tab').css({
        'font-family':'Roboto, sans-serif !important'
    });
    React.render(
        <APP />,
        document.getElementById('graffiti-app')
    );
}


//// later, you can stop observing
////observer.disconnect();
//function injectApp(){
//    function checkForPs () {
//        if(!$('p').length){
//            if(retries === 5){
//                return false;
//            }
//            else{
//                setTimeout(function(){
//                    retries+=1;
//                    checkForPs()
//                },1000);
//            }
//        }
//        else{
//            injected = true;
//            React.render(
//                <APP />,
//                document.getElementById('graffiti-app')
//            );
//            setTimeout(function(){
//                injected = false;
//            },2000)
//        }
//
//    }
//    checkForPs();
//}
//
//    $('body').prepend('<div id="graffiti-app"></div>');
//    $('#graffiti-app,#graffiti-app *,.spray-tab').css({
//        'font-family':'Roboto, sans-serif !important'
//    });
//
//// create an observer instance
//    if($('p').length > 1){
//        injectApp();
//    }
//    else{
//        observer = new MutationObserver(function(mutations) {
//            mutations.forEach(function(mutation) {
//                console.log(mutation.type);
//                if(mutation.type === 'childList' && injected === false){
//                    injectApp();
//                }
//            });
//        });
//
//        // configuration of the observer:
//        var config = { attributes: true, childList: true, characterData: true }
//
//// pass in the target node, as well as the observer options
//        observer.observe(target, config);
//
//// later, you can stop observing
////    observer.disconnect();
//    }