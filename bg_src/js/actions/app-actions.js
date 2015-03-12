var AppConstants = require('../constants/app-constants.js');
var AppDispatcher = require('../dispatchers/app-dispatcher.js');

var AppActions = {
    sendIdentities:function(user){
        AppDispatcher.handleViewAction({
            actionType: AppConstants.GET_IDENTITIES,
            user:user
        })
    },
    changeIdentity: function(identity){
        AppDispatcher.handleViewAction({
            actionType: AppConstants.CHANGE_IDENTITY,
            identity:identity
        })
    },
    sendFeed: function(feed){
        AppDispatcher.handleViewAction({
            actionType: AppConstants.GET_FEED,
            feed:feed
        })
    },
    sendPublic:function(groups){
        AppDispatcher.handleViewAction({
            actionType: AppConstants.GET_PUBLIC,
            groups:groups
        })
    }
};

module.exports = AppActions;
