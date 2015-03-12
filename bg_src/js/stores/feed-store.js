var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');
var merge = require('react/lib/merge');
var BaseStore = require('./base-store');
var _ = require('lodash');

var _feed = {
    pages:[]
};

var FeedStore = merge(BaseStore,{

    getFeed: function(){
        return _feed;
    },

    dispatcherIndex:AppDispatcher.register(function(payload){
        var action = payload.action;

        switch(action.actionType){
            case AppConstants.GET_FEED:
                console.log(action.feed);
                _feed.pages = _feed.pages.concat(action.feed);
                FeedStore.emitChange();
                break;

        }

        return true;
    })
});

module.exports = FeedStore;