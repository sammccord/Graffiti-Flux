var Graffiti = new Graffiti('http://192.168.1.24:9000');
var socket = io.connect('http://192.168.1.24:9000', {
    path: '/socket.io-client',
    transports: ['websocket'],
    'force new connection': true
});

var _rooms = {};

socket.on('update',function(page){
    if(!page) return false;
    console.log('FROM SOCKET UPDATE',page);
    chrome.tabs.sendMessage(_rooms[page._id],{
        action:'getPage',
        data:page
    })
});

chrome.storage.sync.clear();

var user = {
    identities:[{
        'organization_id':'54dbdbda085c8ae33f6ed324',
        'organization':'Hackernews',
        'name':'sammccord'
    },
        {
            'organization_id':'54dbdbda085c8ae33f6ed323',
            'organization':'Graffiti',
            'name':'sammccord'
        },
        {
            'organization_id':'54dbdbda085c8ae33f6ed324',
            'organization':'Fullstack',
            'name':'sammccord'
        }],
    defaultIdentity: {
        'organization_id':'54dbdbda085c8ae33f6ed325',
        'organization':'Fullstack',
        'name':'sammccord'
    }
};

getIdentities();

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status && changeInfo.status == 'complete') {
        chrome.tabs.sendMessage(tabId, {
            //message
            action: 'initializePage',
            err: null,
            data: user.defaultIdentity
        }, function(response) {
            //if (response) console.log(response);
        });
    }
});

//// Content Script Message Handling //////

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    var action = message.action;
    switch(action){
        case 'getIdentities':
            chrome.tabs.sendMessage(sender.tab.id,{
                action:action,
                data:user
            });
            break;
        default:
            Graffiti[message.endpoint]()[message.method](message.args, function(err, data) {
                console.log(message.endpoint+' API CALL - ',arguments);
                if(action === 'getPage'){
                    if(!err){
                        _rooms[data._id] = sender.tab.id;
                        socket.emit('join','page/'+data._id);
                    }
                }
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
            user = JSON.parse(data.user);
        }
        if(cb) cb();
    });
}

function addIdentity(organization,name,organization_id) {
    var newIdentity = {};
    var isNew = true;
    user.identities.forEach(function(identity){
        if(identity.organization_id === organization_id){
            identity.name = name;
            isNew = false;
        }
    });
    if(isNew){
        newIdentity['organization'] = organization;
        newIdentity['name'] = name;
        newIdentity['organization_id'] =organization_id;
        user.identities.push(newIdentity);
    }
    if(!user.defaultIdentity.name){
        user.defaultIdentity = newIdentity;
    }
}

function setDefaultIdentity(organization,name,organization_id){
    user.defaultIdentity['organization'] = organization;
    user.defaultIdentity['name'] = name;
    user.defaultIdentity['organization_id']=organization_id;
}

//chrome.storage.onChanged.addListener(function(changes, namespace) {
//    for (key in changes) {
//        var storageChange = changes[key];
//        console.log('Storage key "%s" in namespace "%s" changed. ' +
//            'Old value was "%s", new value is "%s".',
//            key,
//            namespace,
//            storageChange.oldValue,
//            storageChange.newValue);
//    }
//});

chrome.runtime.onMessageExternal.addListener(
    function(request, sender, sendResponse) {
        if(request.action === 'getIdentities'){
            getIdentities();
            sendResponse(user);
        }
        if(request.action === 'setDefaultIdentity'){
            setDefaultIdentity(request.organization,request.name,request.organization_id);
            sendResponse(user);
            chrome.storage.sync.set({'user':JSON.stringify(user)});
        }
        if(request.action === 'addIdentity'){
            addIdentity(request.organization,request.name,request.organization_id);
            sendResponse(user);
            chrome.storage.sync.set({'user':JSON.stringify(user)});
        }
    });
