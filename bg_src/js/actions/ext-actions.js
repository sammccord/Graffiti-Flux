var AppActions = require('./app-actions');

function sendMessage (payload) {
    chrome.runtime.sendMessage(payload);
}

var ExtActions = {
    getIdentities:function(){
        sendMessage({
            action:'getIdentities:action'
        })
    },
    setDefaultIdentity:function(organization,name,organization_id){
        sendMessage({
            action:'setDefaultIdentity',
            organization:organization,
            name:name,
            organization_id:organization_id
        })
    },
    addIdentity:function(organization,name,organization_id){
        sendMessage({
            action:'addIdentity',
            organization:organization,
            name:name,
            organization_id:organization_id
        })
    },
    queryCode:function(code){
        sendMessage({
            action:'queryCode',
            endpoint:'Organization',
            method:'GET',
            args:{
                code:code
            }
        })
    },
    getFeed:function(){
        sendMessage({
            action:'getFeed'
        })
    },
    toggleGroup:function(_id){
        sendMessage({
            action:'toggleGroup',
            _id:_id
        })
    }
};

chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {
        if(AppActions[request.action]) AppActions[request.action](request.data);
    });


module.exports = ExtActions;
