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
    getPage:function(url,organization_id){
        console.log('GETTING PAGE STATE',arguments);
        sendMessage({
            action:'getPage',
            endpoint: 'Page',
            method:'GET',
            args:{
                page:url,
                organization_id:organization_id
            }
        })
    },
    addComment : function(spray_id,user,text){
        console.log('ADDING COMMENT',arguments);
        sendMessage({
            action:'addComment',
            endpoint: 'Comment',
            method: 'POST',
            args:{
                spray_id:spray_id,
                user: user,
                text:text
            }
        })
    }
};

chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log('ON MESSAGE',request);
        if(AppActions[request.action]) AppActions[request.action](request.data);
    });


module.exports = ExtActions;
