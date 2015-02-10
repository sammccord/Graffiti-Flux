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
    addSpray : function(page_id,targetText,user,text){
        console.log('ADDING COMMENT',arguments);
        sendMessage({
            action:'addSpray',
            endpoint: 'Spray',
            method: 'POST',
            args:{
                page_id:page_id,
                targetText:targetText,
                user:user,
                text:text
            }
        })
    },
    createPageAddFreshSpray: function(org_id,page_ref,targetText,user,text){
        console.log('CREATING PAGE AND ADDING SPRAY',arguments);
        sendMessage({
            action:'initializePage',
            endpoint: 'Page',
            method: 'POST',
            args:{
                org_id:org_id,
                ref:page_ref,
                targetText:targetText,
                user: user,
                text:text
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
        if(AppActions[request.action]) AppActions[request.action](request.data);
    });


module.exports = ExtActions;
