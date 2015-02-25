var Graffiti = new Graffiti('http://192.168.2.3:9000');
var animals= ["Horse", "Cat", "Dog", "Mouse", "Aardvark", "Platypus", "Koala", "Leminux", "Seal", "Antelope", "Liger", "Pengiun", "Narwhal", "Bear", "Panther", "Goose", "Goat", "Lion", "Whale", "Clam", "Jellyfish", "Manowar", "Unicorn", "Albatross", "Sasquatch", "Gorilla", "Lemur", "Chinchilla", "Badger", "Mustang", "Shrimp", "Lobster", "Jellyfish", "Guppy", "Tuna", "Carp", "Rooster", "Pollyp", "Octopus", "Pteradacty", "Chicken", "Komodo Dragon", "Wolf", "Bison", "Mastodon", "Mosquito", "Tarantula", "Hippopotamus", "Anaconda"];

var _rooms = {};

var _current_tag = {};

//socket.on('update',function(page){
//    if(!page) return false;
//    console.log('FROM SOCKET UPDATE',page);
//    chrome.tabs.sendMessage(_rooms[page._id],{
//        action:'getPage',
//        data:page
//    })
//});

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
    console.log(message);
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
            case 'getFeed':
                var _ids = user.identities.reduce(function(init,next){
                    return init.push(next.organization_id);
                },[]);
                Graffiti[message.endpoint]()[message.method]({org_ids:_ids}, function(err, data) {
                    console.log(message.endpoint+' API CALL - ',arguments);
                });
            break;
        default:
            Graffiti[message.endpoint]()[message.method](message.args, function(err, data) {
                console.log(message.endpoint+' API CALL - ',arguments);
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
                organization_id : '54e1512170a92b0d4c2011e8',
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

var clickHandler = function(e) {
    var url = e.pageUrl;
    var buzzPostUrl = "http://www.google.com/buzz/post?";

    if (e.selectionText) {
        // The user selected some text, put this in the message.
        buzzPostUrl += "message=" + encodeURI(e.selectionText) + "&";
    }

    if (e.mediaType === "image") {
        buzzPostUrl += "imageurl=" + encodeURI(e.srcUrl) + "&";
    }

    if (e.linkUrl) {
        // The user wants to buzz a link.
        url = e.linkUrl;
    }

    buzzPostUrl += "url=" + encodeURI(url);

    // Open the page up.
    chrome.tabs.create(
        {"url" : buzzPostUrl });
};

chrome.contextMenus.create({
    "title": "Buzz This",
    "contexts": ["page", "selection", "image", "link"],
    "onclick" : clickHandler
});