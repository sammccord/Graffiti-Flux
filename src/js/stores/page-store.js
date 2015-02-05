var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');
var merge = require('react/lib/merge');
var BaseStore = require('./base-store');
var _ = require('lodash');

var CHANGE_EVENT = "page";

var _pageState = {
    _id: '1299hnbdyhsaiu',
    pageRef: 'String',
    filter: 'Graffiti'
};

var _changeFilter = function (newFilter) {
    _pageState.filter = newFilter;
};

var PageStore = merge(BaseStore,{

    getPageState: function(){
        return _pageState;
    },

    dispatcherIndex:AppDispatcher.register(function(payload){
        var action = payload.action;

        switch(action.actionType){
            case AppConstants.CHANGE_PAGE_FILTER:
                _changeFilter(payload.action.filter);
                break;
        }

        PageStore.emitChange();

        return true;
    })
})

module.exports = PageStore;
