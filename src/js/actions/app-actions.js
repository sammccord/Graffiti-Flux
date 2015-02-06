var AppConstants = require('../constants/app-constants.js');
var AppDispatcher = require('../dispatchers/app-dispatcher.js');

var AppActions = {
    changeIdentity: function(identity){
        AppDispatcher.handleViewAction({
            actionType: AppConstants.CHANGE_IDENTITY,
            identity:identity
        })
    },
    addComment : function(id,user,text){
        AppDispatcher.handleViewAction({
            actionType: AppConstants.ADD_COMMENT,
            id:id,
            user: user,
            text:text
        })
    }
}

module.exports = AppActions;