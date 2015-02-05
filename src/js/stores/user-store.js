var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');
var merge = require('react/lib/merge');
var BaseStore = require('./base-store');
var _ = require('lodash');

var CHANGE_EVENT = "user";

var _user = {
    'Graffiti': 'graff-sammccord',
    'HackerNews':'hn-sammccord',
    'Fullstack': 'fs-sammccord'
};

var _current_identity = 'Graffiti';

var _changeIdentity = function(newIdentity){
    _current_identity =  newIdentity;
};

var UserStore = merge(BaseStore,{

    getIdentities: function(){
        return _user;
    },

    getCurrentIdentity: function(){
        return _user[_current_identity];
    },

    dispatcherIndex:AppDispatcher.register(function(payload){
        var action = payload.action;

        switch(action.actionType){
            case AppConstants.CHANGE_IDENTITY:
                _changeIdentity(payload.action.identity);
                break;

        }
        UserStore.emitChange();

        return true;
    })
});

module.exports = UserStore;