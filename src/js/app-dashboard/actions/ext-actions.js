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
    }
};

chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {
        if(DashActions[request.action]) DashActions[request.action](request.data);
    });


module.exports = ExtActions;
