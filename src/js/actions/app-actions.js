var AppConstants = require('../constants/app-constants.js');
var AppDispatcher = require('../dispatchers/app-dispatcher.js');

var AppActions = {
    initializePage:function(){
        AppDispatcher.handleViewAction({
            actionType: AppConstants.INITIALIZE_PAGE
        })
    },
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
};

chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(request.data);
        AppActions[request.action](request.data);
    });

module.exports = AppActions;
