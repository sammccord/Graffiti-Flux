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
    getAggregate: function(ref,_ids){
        sendMessage({
            action:'getPage',
            endpoint: 'Page',
            method:'getAggregate',
            args:{
                ref:ref,
                _ids:_ids
            }
        })
    },
    getPage:function(url,organization_id){
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
    addSpray : function(_ids,names,ref,targetText,text,index){
        console.log(arguments);
        sendMessage({
            action:'addSpray',
            endpoint: 'Spray',
            method: 'POST',
            args:{
                _ids:_ids,
                names:names,
                ref:ref,
                targetText:targetText,
                text:text,
                p_index:index
            }
        })
    },
    createPageAddFreshSpray: function(_ids,names,page_ref,targetText,text,index,url,title){
        sendMessage({
            action:'getPage',
            endpoint: 'Page',
            method: 'POST',
            args:{
                _ids:_ids,
                url:url,
                title:title,
                names:names,
                ref:page_ref,
                targetText:targetText,
                text:text,
                p_index:index
            }
        })
    },
    addComment : function(spray_id,user,text){
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
        console.log(request);
        if(AppActions[request.action]) AppActions[request.action](request.data);
    });


module.exports = ExtActions;
