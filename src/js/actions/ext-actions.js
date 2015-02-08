var AppActions = require('./app-actions');

function sendMessage (payload) {
    chrome.runtime.sendMessage(payload);
}

var ExtActions = {
    getIdentities:function(){
        sendMessage({
            action:'getIdentities'
        })
    },
    getPageState:function(url,organization){
        console.log('GETTING PAGE STATE');
    }
};

chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log('EXT-ACTION',request);
        AppActions[request.action](request.data);
    });


module.exports = ExtActions;
