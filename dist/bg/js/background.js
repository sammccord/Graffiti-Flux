//PUT YOUR IP ADDRESS HERE with http:// in front of it. It's important.
var Graffiti = new Graffiti('http://192.168.1.24:9000');

var user = [];

chrome.storage.local.clear();

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status && changeInfo.status == 'complete') {
        chrome.tabs.sendMessage(tabId, {
            //message
            action: 'initializePage',
            err: null,
            data: null
        }, function(response) {
            if (response) console.log(response);
        });
    }
});

function getIdentity() {
    chrome.storage.local.get('identities', function(identities) {
        console.log(identities);
        user = identities;
        if(typeof user === 'object'){
            return user;
        }
        else{
            return JSON.parse(user);
        }
    });
}

function addIdentity(origin,name,cb) {
    user.push({
        origin:name
    });
    console.log(user);
    chrome.storage.local.set({'identities':JSON.stringify(user)});
}

chrome.runtime.onMessageExternal.addListener(
    function(request, sender, sendResponse) {
        if(request.action === 'getIdentities'){
            sendResponse(user);
        }
        if(request.action === 'addIdentity'){
            addIdentity(request.data.origin,request.data.name);
            sendResponse(user);
        }
    });
