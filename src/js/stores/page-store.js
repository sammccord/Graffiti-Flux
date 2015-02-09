var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');

var io = require('socket.io-client');
var socket;


var ExtActions = require('../actions/ext-actions');
var AppActions = require('../actions/app-actions');

var merge = require('react/lib/merge');
var SprayStore = require('./spray-store');
var UserStore = require('./user-store');
var BaseStore = require('./base-store');
var _ = require('lodash');

var CHANGE_EVENT = "page";

var fresh_page = {
    fresh: true,
    _id: '',
    organization: '',
    organization_id: '',
    ref: ''+document.domain.replace(/\./g, '+') + window.location.pathname.replace(/\//g, '+')
};

var _pageState = {
    fresh: true,
    _id: '',
    organization: '',
    organization_id: '',
    ref: ''+document.domain.replace(/\./g, '+') + window.location.pathname.replace(/\//g, '+')
};

function joinRoom(_id){
    if(socket) socket.disconnect();

    socket = io.connect('http://192.168.1.24:9000', {
        query: 'page='+_id,
        path: '/socket.io-client',
        transports: ['websocket'],
        'force new connection': true
    });

    socket.on('update',function(page){
        AppActions.loadSprays(page.sprays);
    });

    window.onbeforeunload = function(e) {
        socket.disconnect();
    };
}

var PageStore = merge(BaseStore,{

    getPageState: function(){
        return _pageState;
    },

    dispatcherIndex:AppDispatcher.register(function(payload){
        var action = payload.action;

        switch(action.actionType){
            case AppConstants.INITIALIZE_PAGE:
                _pageState.organization = action.default_identity.organization;
                _pageState.organization_id = action.default_identity.organization_id;

                ExtActions.getPage(_pageState.ref,_pageState.organization_id);

                PageStore.emitChange();
                break;
            case AppConstants.GET_PAGE:
                console.log('GOT_PAGE',action);

                if(!action.page){
                    _pageState = fresh_page;
                    AppActions.loadSprays([]);
                }
                else{
                    _pageState._id = action.page._id;

                    joinRoom(action.page._id);

                    AppActions.loadSprays(action.page.sprays);
                }

                break;
            case AppConstants.CHANGE_IDENTITY:
                console.log(payload.action.identity);
                ExtActions.getPage(_pageState.ref,payload.action.identity.organization_id);
                break;
        }

        return true;
    })
});

module.exports = PageStore;
