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
    fresh: true,
    _id: '',
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
                if(action.default_identity){
                    _pageState.organization = action.default_identity.organization;
                    _pageState.organization_id = action.default_identity.organization_id;
                }

                ExtActions.getPage(_pageState.ref,_pageState.organization_id);

                PageStore.emitChange();
                break;
            case AppConstants.GET_PAGE:
                console.log('GETTING PAGE',action);
                if(!action.page){
                    console.log('!!!!!!!! FRESH PAGE');
                    _pageState.fresh = true;
                    AppActions.loadSprays([]);
                }
                else{
                    console.log('LOADING NEW SPRAYS',action.page);
                    _pageState.fresh = false;
                    _pageState._id = action.page._id;

                    AppActions.loadSprays(action.page.sprays);
                }
                PageStore.emitChange();

                break;
            case AppConstants.CHANGE_IDENTITY:
                _pageState.organization_id = action.identity.organization_id;
                ExtActions.getPage(_pageState.ref,action.identity.organization_id);
                break;
        }

        return true;
    })
});

module.exports = PageStore;
