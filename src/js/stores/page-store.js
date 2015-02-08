var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');
var merge = require('react/lib/merge');
var UserStore = require('./user-store');
var BaseStore = require('./base-store');
var _ = require('lodash');

var CHANGE_EVENT = "page";

var _pageState = {
    _id: '1299h44nbd3yhsai2u',
    pageRef: 'localhost:63342'
};

var PageStore = merge(BaseStore,{

    getPageState: function(){
        return _pageState;
    },

    dispatcherIndex:AppDispatcher.register(function(payload){
        var action = payload.action;

        switch(action.actionType){
            case AppConstants.INITIALIZE_PAGE:
                console.log('INITIALIZING PAGE');
                console.log('CURRENT IDENTITY',UserStore.getCurrentIdentity());
                PageStore.emitChange();
                break;
        }

        return true;
    })
});

module.exports = PageStore;
