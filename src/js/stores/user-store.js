var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');
var merge = require('react/lib/merge');
var BaseStore = require('./base-store');
var _ = require('lodash');

var CHANGE_EVENT = "user";

var _identities = [];

var _current_identity = {};

var _changeIdentity = function(newIdentity){
    _current_identity =  newIdentity;
};

var UserStore = merge(BaseStore,{

    getIdentities: function(){
        return _identities;
    },

    getIdentityById: function(id){
        var found = {};
        _identities.forEach(function(identity){
          if(identity.organization_id === id){
              found = identity;
          }
        });
        return found;
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

            case AppConstants.CHANGE_IDENTITY:
                _changeIdentity(payload.action.identity);
                UserStore.emitChange();
                break;

        }

        return true;
    })
});

module.exports = UserStore;
