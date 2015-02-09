var Graffiti = new Graffiti('http://192.168.1.24:9000');
var graffiti_org_id = '54d8fb555148115815855a3f';

var user = {
    identities:[],
    defaultIdentity: {}
};

var _nameSpaces = {};

chrome.storage.sync.clear();

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status && changeInfo.status == 'complete') {
        chrome.tabs.sendMessage(tabId, {
            //message
            action: 'initializePage',
            err: null,
            data: user.defaultIdentity
        }, function(response) {
            if (response) console.log(response);
        });
    }
});

//// Content Script Message Handling //////

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    var action = message.action;
    console.log(user);
    switch(action){
        case 'getIdentities':
            chrome.tabs.sendMessage(sender.tab.id,{
                action:action,
                data:user
            });
            break;
        default:
            Graffiti[message.endpoint]()[message.method](message.args, function(err, data) {
                console.log(arguments);
                chrome.tabs.sendMessage(sender.tab.id, {
                    action: message.action,
                    data: data,
                    err: err
                });
            })
    }
})

//// Identity Functions /////

function getIdentities(cb) {
    chrome.storage.sync.get('user', function(data) {
        if(!data.user){
            console.log('no data user');
            //user.defaultIdentity.name = "test_user123";
            //user.defaultIdentity.organization = 'Graffiti';
            //user.defaultIdentity.organization_id = graffiti_org_id;
            //user.identities.push(user.defaultIdentity);
            chrome.storage.sync.set({'user':JSON.stringify(user)});
        }
        else{
            console.log(data.user);
            user = JSON.parse(data.user);
        }
        if(cb) cb();
    });
}

function addIdentity(organization,name,organization_id) {
    var newIdentity = {};
    var isNew = true;
    user.identities.forEach(function(identity){
        if(identity.organization === organization){
            identity.name = name;
            isNew = false;
        }
    });
    if(isNew){
        newIdentity['organization'] = organization;
        newIdentity['name'] = name;
        newIdentity['organization_id'] =organization_id;
        user.identities.push(newIdentity);
        console.log('SHOULD NAMESPACE',organization_id);
    }

    if(!user.defaultIdentity.name){
        user.defaultIdentity = newIdentity;
    }
    chrome.storage.sync.set({'user':JSON.stringify(user)});
}

function setDefaultIdentity(organization,name,organization_id){
    user.defaultIdentity['organization'] = organization;
    user.defaultIdentity['name'] = name;
    user.defaultIdentity['organization_id']=organization_id;
    chrome.storage.sync.set({'user':user});
}

chrome.storage.onChanged.addListener(function(changes, namespace) {
    for (key in changes) {
        var storageChange = changes[key];
        console.log('Storage key "%s" in namespace "%s" changed. ' +
            'Old value was "%s", new value is "%s".',
            key,
            namespace,
            storageChange.oldValue,
            storageChange.newValue);
    }
});

chrome.runtime.onMessageExternal.addListener(
    function(request, sender, sendResponse) {
        if(request.action === 'getIdentities'){
            console.log('GETTING IDENTITIES');
            getIdentities();
            sendResponse(user);
        }
        if(request.action === 'setDefaultIdentity'){
            setDefaultIdentity(request.organization,request.name);
            sendResponse(user);
        }
        if(request.action === 'addIdentity'){
            addIdentity(request.organization,request.name,request.organization_id);
            sendResponse(user);
        }
    });
