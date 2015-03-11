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
    title:'',
    url:'',
    activated: false,
    fresh: true,
    ref: ''
};

var PageStore = merge(BaseStore,{

    getPageState: function(){
        return _pageState;
    },

    dispatcherIndex:AppDispatcher.register(function(payload){
        var action = payload.action;

        switch(action.actionType){
            case AppConstants.INITIALIZE_PAGE:
                console.log(action);

                _pageState.ref = ''+document.domain.replace(/\./g, '+') + window.location.pathname.replace(/\//g, '+');
                _pageState.url = window.location.href;
                _pageState.title = document.querySelector('title').innerHTML;

                console.log(action.user.identities);
                var _ids = action.user.identities.filter(function(identity){
                    return identity.active;
                }).map(function(identity){
                    console.log(identity);
                    return identity.organization_id;
                });

                //ExtActions.getPage(_pageState.ref,_pageState.organization_id);
                ExtActions.getAggregate(_pageState.ref,_ids);

                PageStore.emitChange();
                break;
            case AppConstants.GET_PAGE:
                console.log(action);
                console.log('GETTING PAGE',action);
                _pageState.activated = true;
                if(!action.page){
                    console.log('!!!!!!!! FRESH PAGE',_pageState);
                    _pageState.fresh = true;
                    AppActions.loadSprays([]);
                }
                else{
                    console.log('LOADING NEW SPRAYS',action.page);
                    _pageState.fresh = false;

                    AppActions.loadSprays(action.page.sprays);
                }
                PageStore.emitChange();

                break;
            case AppConstants.RESET_PAGE:
                    _pageState = {
                    title:'',
                    url:'',
                    activated: false,
                    fresh: true,
                    _id: '',
                    organization_id: '',
                    ref: ''
                };
                AppActions.resetSprays();
                PageStore.emitChange();
                break;
        }

        return true;
    })
});

module.exports = PageStore;
