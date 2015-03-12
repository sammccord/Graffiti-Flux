
//var Graffiti = new Graffiti('http://graffiti.herokuapp.com');
var Graffiti = new Graffiti('http://10.0.1.187:9000');
var animals= ["Horse", "Cat", "Dog", "Mouse", "Aardvark", "Platypus", "Koala", "Leminux", "Seal", "Antelope", "Liger", "Pengiun", "Narwhal", "Bear", "Panther", "Goose", "Goat", "Lion", "Whale", "Clam", "Jellyfish", "Manowar", "Unicorn", "Albatross", "Sasquatch", "Gorilla", "Lemur", "Chinchilla", "Badger", "Mustang", "Shrimp", "Lobster", "Jellyfish", "Guppy", "Tuna", "Carp", "Rooster", "Pollyp", "Octopus", "Pteradacty", "Chicken", "Komodo Dragon", "Wolf", "Bison", "Mastodon", "Mosquito", "Tarantula", "Hippopotamus", "Anaconda"]

chrome.storage.sync.clear();

var user = {
    token:'',
    ip:'',
    _id:'',
    groups:[],
    identities:[]
};

getIdentities();

//// Content Script Message Handling //////
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    console.log(message);
    var action = message.action;
    switch(action){
        case 'getIdentities':
            console.log(user);
            chrome.tabs.sendMessage(sender.tab.id,{
                action:action,
                data:user
            });
            break;
            case 'toggleGroup':
                user.identities.forEach(function(identity){
                    console.log(message);
                    console.log(message._id,identity.organization_id);
                    if(message._id === identity.organization_id){
                        identity.active = !identity.active;
                    }
                });
                chrome.runtime.sendMessage({
                    action:'sendIdentities',
                    data:user
                });
            break;
            case 'getIdentities:action':
                chrome.runtime.sendMessage({
                    action:'sendIdentities',
                    data:user
                });
            break;
            case 'addIdentity':
                addIdentity(message.organization,message.name,message.organization_id);
                console.log(user);
                chrome.runtime.sendMessage({
                    action:'sendIdentities',
                    data:user
                });
                chrome.storage.sync.set({'user':JSON.stringify(user)});
            break;
            case 'getFeed':
                console.log('GETTING FEED');
                var _ids = user.identities.map(function(el){
                    return el.organization_id;
                });
                console.log(_ids);
                Graffiti['Organization'](user.token)['getFeed']({_ids:_ids}, function(err, data) {
                    chrome.runtime.sendMessage({
                        action:'sendFeed',
                        data:data,
                        err:err
                    })
                });
            break;
            case 'getPublic':
                console.log(_ids);
                Graffiti['Organization'](user.token)['getPublic'](null, function(err, data) {
                    chrome.runtime.sendMessage({
                        action:'sendPublic',
                        data:data,
                        err:err
                    })
                });
                break;
        default:
            if(Graffiti[message.endpoint]){
                Graffiti[message.endpoint](user.token)[message.method](message.args, function(err, data) {
                    console.log(message.endpoint+' API CALL - ',arguments);
                    chrome.tabs.sendMessage(sender.tab.id, {
                        action: message.action,
                        data: data,
                        err: err
                    });
                })
            }
            else break;
    }
});

//// Identity Functions /////

function getIdentities(cb) {
    chrome.storage.sync.get('user', function(data) {
        if(!data.user){
            Graffiti.User().POST({
                    password: new Date().getTime()
                },
                function(err,data){
                    console.log(err);
                    if(!err){
                        console.log(data);
                        user.fresh = true;
                        user.ip = data.user.ip;
                        user._id = data.user._id;
                        user.token = data.token;
                    }

                    var newIdentity = {
                        active: true,
                        name: "Anonymous "+animals[Math.floor(Math.random()*animals.length)],
                        organization:'Graffiti',
                        organization_id : '54e1512170a92b0d4c2011e8',
                        spray_color:'rgb(96, 96, 96)'
                    };

                    user.identities.push(newIdentity);
                    chrome.storage.sync.set({'user':JSON.stringify(user)});
                });

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
        newIdentity['active'] = true;
        newIdentity['organization'] = organization;
        newIdentity['name'] = name;
        newIdentity['organization_id'] =organization_id;
        newIdentity['spray_color'] = 'rgb(96, 96, 96)';
        user.identities.push(newIdentity);
    }

}

var clickHandler = function(e) {
        chrome.tabs.query(
            { currentWindow: true, active: true },
            function (tabArray) {
                chrome.tabs.sendMessage(tabArray[0].id, {
                    //message
                    action: 'initializePage',
                    err: null,
                    data: user
                }, function(response) {
                    //if (response) console.log(response);
                });
            }
        );
};

chrome.contextMenus.create({
    "title": "See Tags",
    //"contexts": ["page"],
    "contexts": ["page", "selection", "image", "link"],
    "onclick" : clickHandler
});
