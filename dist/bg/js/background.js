var Graffiti = new Graffiti('http://192.168.1.24:9000');
var animals= ["Horse", "Cat", "Dog", "Mouse", "Aardvark", "Platypus", "Koala", "Leminux", "Seal", "Antelope", "Liger", "Pengiun", "Narwhal", "Bear", "Panther", "Goose", "Goat", "Lion", "Whale", "Clam", "Jellyfish", "Manowar", "Unicorn", "Albatross", "Sasquatch", "Gorilla", "Lemur", "Chinchilla", "Badger", "Mustang", "Shrimp", "Lobster", "Jellyfish", "Guppy", "Tuna", "Carp", "Rooster", "Pollyp", "Octopus", "Pteradacty", "Chicken", "Komodo Dragon", "Wolf", "Bison", "Mastodon", "Mosquito", "Tarantula", "Hippopotamus", "Anaconda"];
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
    identities:[],
    defaultIdentity: {}
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
            case 'setDefaultIdentity':
                setDefaultIdentity(message.organization,message.name,message.organization_id);
                chrome.tabs.sendMessage(sender.tab.id,{
                    action:'getIdentities',
                    data:user
                });
                chrome.storage.sync.set({'user':JSON.stringify(user)});
            break;
            case 'addIdentity':
                addIdentity(message.organization,message.name,message.organization_id);
                console.log(user);
                chrome.tabs.sendMessage(sender.tab.id,{
                    action:'getIdentities',
                    data:user
                });
                chrome.storage.sync.set({'user':JSON.stringify(user)});
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
});

//// Identity Functions /////

function getIdentities(cb) {
    chrome.storage.sync.get('user', function(data) {
        if(!data.user){
            console.log('no data user');
            var newIdentity = {
                name: "Anonymous "+animals[Math.floor(Math.random()*animals.length)],
                organization:'Graffiti',
                organization_id : '54de704de86dac87203b79d7',
                spray_color:'rgb(96, 96, 96)'
            };
            user.defaultIdentity = newIdentity;
            user.identities.push(newIdentity);
            chrome.storage.sync.set({'user':JSON.stringify(user)});
        }
        else{
            user = JSON.parse(data.user);
        }
        if(cb) cb(user);
    });
}

function addIdentity(organization,name,organization_id) {
    var newIdentity = {};
    var isNew = true;

    user.identities.forEach(function(identity){
        if(identity.organization_id === organization_id){
            isNew = false;
            identity.name = name;
        }
    });

    if(isNew === true){
        newIdentity['organization'] = organization;
        newIdentity['name'] = name;
        newIdentity['organization_id'] =organization_id;
        newIdentity['spray_color'] = 'rgb(96, 96, 96)';
        user.identities.push(newIdentity);
    }

}

function setDefaultIdentity(organization,name,organization_id){
    var defaultIdentity = {
        organization:organization,
        name:name,
        organization_id:organization_id,
        spray_color:'rgb(96, 96, 96)'
    };
    user.defaultIdentity = defaultIdentity;
}
