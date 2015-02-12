var DashActions = require('./dash-actions');

function sendMessage (payload) {
    chrome.runtime.sendMessage(payload);
}

var ExtActions = {
    getIdentities:function(){
        sendMessage({
            action:'getIdentities'
        })
    },
    changeIdentity:function(){
        sendMessage({
            action:'changeIdentity'
        })
    }
};

chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {
        if(DashActions[request.action]) DashActions[request.action](request.data);
    });


module.exports = ExtActions;
