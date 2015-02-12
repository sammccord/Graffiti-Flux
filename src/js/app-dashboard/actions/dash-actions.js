var AppConstants = require('../constants/dash-constants.js');
var AppDispatcher = require('../dispatchers/app-dispatcher.js');

var AppActions = {
    getIdentities:function(user){
        AppDispatcher.handleViewAction({
            actionType: AppConstants.GET_IDENTITIES,
            user:user
        })
    },
    queryCode:function(organization){
        AppDispatcher.handleViewAction({
            actionType: AppConstants.QUERY_CODE,
            organization:organization
        })
    }
};

module.exports = AppActions;
