var AppConstants = require('../constants/app-constants.js');
var AppDispatcher = require('../dispatchers/app-dispatcher.js');

var AppActions = {
    changeIdentity: function(identity){
        AppDispatcher.handleViewAction({
            actionType: AppConstants.CHANGE_IDENTITY,
            identity:identity
        })
    },

    addItem: function(item){
        AppDispatcher.handleViewAction({
            actionType: AppConstants.ADD_ITEM,
            item:item
        })
    },
    removeItem: function(index){
        AppDispatcher.handleViewAction({
            actionType: AppConstants.REMOVE_ITEM,
            index:index
        })
    },
    increaseItem: function(item){
        AppDispatcher.handleViewAction({
            actionType: AppConstants.INCREASE_ITEM,
            item:item
        })
    },
    decreaseItem: function(index){
        AppDispatcher.handleViewAction({
            actionType: AppConstants.DECREASE_ITEM,
            index:index
        })
    }
}

module.exports = AppActions;