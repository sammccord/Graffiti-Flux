var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');
var merge = require('react/lib/merge');
var BaseStore = require('./base-store');
var _ = require('lodash');

var _groups = []

var GroupStore = merge(BaseStore,{

    getPublic: function(){
        return _groups;
    },

    dispatcherIndex:AppDispatcher.register(function(payload){
        var action = payload.action;

        switch(action.actionType){
            case AppConstants.GET_PUBLIC:
                console.log(action.groups);
                _groups = action.groups;
                GroupStore.emitChange();
                break;

        }

        return true;
    })
});

module.exports = GroupStore;