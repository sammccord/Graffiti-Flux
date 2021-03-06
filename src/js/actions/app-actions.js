var AppConstants = require('../constants/app-constants.js');
var AppDispatcher = require('../dispatchers/app-dispatcher.js');

var AppActions = {
    getIdentities:function(user){
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
    initializePage:function(user){
        AppDispatcher.handleViewAction({
            actionType: AppConstants.INITIALIZE_PAGE,
            user:user
        })
    },
    getPage:function(page){
        AppDispatcher.handleViewAction({
            actionType: AppConstants.GET_PAGE,
            page:page
        })
    },
    addComment : function(data){
        AppDispatcher.handleViewAction({
            actionType: AppConstants.ADD_COMMENT,
            data:data
        });
    },
    addSpray : function(spray){
        console.log('APP ACTIONS, ADD SPRAY',spray);
        AppDispatcher.handleViewAction({
            actionType: AppConstants.ADD_SPRAY,
            spray:spray
        });
    },
    loadSprays: function(sprays){
        AppDispatcher.handleViewAction({
            actionType: AppConstants.LOAD_SPRAYS,
            sprays:sprays
        })
    },
    resetPage: function(){
        AppDispatcher.handleViewAction({
            actionType: AppConstants.RESET_PAGE
        })
    },
    resetSprays: function(){
        AppDispatcher.handleViewAction({
            actionType: AppConstants.RESET_SPRAYS
        })
    }
};

module.exports = AppActions;
