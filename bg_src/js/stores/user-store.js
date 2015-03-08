var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');
var merge = require('react/lib/merge');
var BaseStore = require('./base-store');
var _ = require('lodash');

var _identities = [];

var _current_identity = {};

var _changeIdentity = function(newIdentity){
    _current_identity =  newIdentity;
};

var UserStore = merge(BaseStore,{

    getIdentities: function(){
        return _identities;
    },

    getCurrentIdentity: function(){
        return _current_identity;
    },

    dispatcherIndex:AppDispatcher.register(function(payload){
        var action = payload.action;

        switch(action.actionType){
            case AppConstants.GET_IDENTITIES:
                console.log('IDENTITIES DISPATCHED',payload.action);
                _identities = payload.action.user.identities;
                _current_identity = payload.action.user.defaultIdentity;
                UserStore.emitChange();
                break;

        }

        return true;
    })
});

module.exports = UserStore;