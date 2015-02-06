var AppConstants = require('../constants/app-constants.js');
var AppDispatcher = require('../dispatchers/app-dispatcher.js');

var AppActions = {
    changeIdentity: function(identity){
        AppDispatcher.handleViewAction({
            actionType: AppConstants.CHANGE_IDENTITY,
            identity:identity
        })
    },
    addComment : function(id,comment){
        AppDispatcher.handleViewAction({
            actionType: AppConstants.ADD_COMMENT,
            id: id,
            comment:comment
        })
    }
}

module.exports = AppActions;