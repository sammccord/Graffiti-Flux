var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');

var ExtActions = require('../actions/ext-actions');

var merge = require('react/lib/merge');
var UserStore = require('./user-store');
var BaseStore = require('./base-store');
var _ = require('lodash');

var CHANGE_EVENT = "page";

var _pageState = {
    _id: '',
    organization: '',
    ref: ''+document.domain.replace(/\./g, '+') + window.location.pathname.replace(/\//g, '+')
};

var PageStore = merge(BaseStore,{

    getPageState: function(){
        return _pageState;
    },

    dispatcherIndex:AppDispatcher.register(function(payload){
        var action = payload.action;

        switch(action.actionType){
            case AppConstants.INITIALIZE_PAGE:
                _pageState.organization = action.default_identity.organization;

                ExtActions.getPage(_pageState.ref,_pageState.organization);

                PageStore.emitChange();
                break;
            case AppConstants.GET_PAGE:
                console.log('GOT_PAGE',action);
                break;
        }

        return true;
    })
});

module.exports = PageStore;
