var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');

var ExtActions = require('../actions/ext-actions');
var AppActions = require('../actions/app-actions');

var merge = require('react/lib/merge');
var SprayStore = require('./spray-store');
var UserStore = require('./user-store');
var BaseStore = require('./base-store');
var _ = require('lodash');

var CHANGE_EVENT = "page";

var _pageState = {
    _id: '',
    organization: '',
    organization_id: '',
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
                _pageState.organization_id = action.default_identity.organization_id;

                ExtActions.getPage(_pageState.ref,_pageState.organization_id);

                PageStore.emitChange();
                break;
            case AppConstants.GET_PAGE:
                console.log('GOT_PAGE',action);
                _pageState._id = action.page._id;
                AppActions.loadSprays(action.page.sprays);
                break;
        }

        return true;
    })
});

module.exports = PageStore;
