var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');
var merge = require('react/lib/merge');
var BaseStore = require('./base-store');
var _ = require('lodash');

var _identities = [];

var UserStore = merge(BaseStore,{

    getIdentities: function(){
        return _identities;
    },

    dispatcherIndex:AppDispatcher.register(function(payload){
        var action = payload.action;

        switch(action.actionType){
            case AppConstants.GET_IDENTITIES:
                console.log('IDENTITIES DISPATCHED',payload.action);
                _identities = payload.action.user.identities;
                UserStore.emitChange();
                break;

        }

        return true;
    })
});

module.exports = UserStore;