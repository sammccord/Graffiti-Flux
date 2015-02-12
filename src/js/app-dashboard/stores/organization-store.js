var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/dash-constants');
var merge = require('react/lib/merge');
var BaseStore = require('./base-store');
var _ = require('lodash');

var _foundOrg = {};

var OrganizationStore = merge(BaseStore,{

    foundOrg: function(){
        return _foundOrg;
    },

    dispatcherIndex:AppDispatcher.register(function(payload){
        var action = payload.action;

        switch(action.actionType){
            case AppConstants.QUERY_CODE:
                console.log('QUERYCODE',payload.action);
                _foundOrg = payload.action.organization;
                OrganizationStore.emitChange();
                break;

        }

        return true;
    })
});

module.exports = OrganizationStore;
