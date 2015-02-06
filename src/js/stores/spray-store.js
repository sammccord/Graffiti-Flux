var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');
var merge = require('react/lib/merge');
var BaseStore = require('./base-store');
var _ = require('lodash');

var CHANGE_EVENT = "sprays";

var _sprays = [
        {
            _id: '1b2iu89dhu',
            organization: 'Graffiti',
            targetText: 'An example ',
            comments: [
                {
                    name: 'First guy',
                    text: 'White hat, I wear that.',
                    replies: [
                        {
                            name: 'Fourth guy',
                            text: 'Princess Bubblegum, I eat that.'
                        }
                    ]
                },
                {
                    name: 'Second guy',
                    text: 'Ice King, I melt that.'
                },
                {
                    name: 'Third guy',
                    text: 'Lich King, I slay that.'
                }
            ]
        },
    {
        _id: '7dcgs900bba',
        organization: 'Graffiti',
        targetText: 'More text ',
        comments: [
            {
                name: 'First guy',
                text: 'White hat, I wear that.',
                replies: [
                    {
                        name: 'Fourth guy',
                        text: 'Princess Bubblegum, I eat that.'
                    }
                ]
            },
            {
                name: 'Second guy',
                text: 'Ice King, I melt that.'
            },
            {
                name: 'Third guy',
                text: 'Lich King, I slay that.'
            }
        ]
    },
    {
        _id: '08sgbvnghjs',
        organization: 'HackerNews',
        targetText: 'An example ',
        comments: [
            {
                name: 'First guy',
                text: 'White hat, I wear that.',
                replies: [
                    {
                        name: 'Fourth guy',
                        text: 'Princess Bubblegum, I eat that.'
                    }
                ]
            },
            {
                name: 'Second guy',
                text: 'Ice King, I melt that.'
            },
            {
                name: 'Third guy',
                text: 'Lich King, I slay that.'
            }
        ]
    },
    {
        _id: 'q43456ygfnk',
        organization: 'Fullstack',
        targetText: 'An example ',
        comments: [
            {
                name: 'First guy',
                text: 'White hat, I wear that.',
                replies: [
                    {
                        name: 'Fourth guy',
                        text: 'Princess Bubblegum, I eat that.'
                    }
                ]
            },
            {
                name: 'Second guy',
                text: 'Ice King, I melt that.'
            },
            {
                name: 'Third guy',
                text: 'Lich King, I slay that.'
            }
        ]
    }
    ];

function _addComment (id,user,text) {
    console.log(id);
    _sprays.forEach(function(spray){
        if(spray._id === id){
            spray.comments.push({
                name: user.name,
                text: text
            });
            console.log(spray);
        }
    })
}

function _addReply(index, reply){

}

var SprayStore = merge(BaseStore, {
    getSprays: function(organization){
        return _sprays.filter(function(spray){
            return spray.organization === organization;
        });
    },

    dispatcherIndex:AppDispatcher.register(function(payload){
        var action = payload.action;

        switch(action.actionType){
            case AppConstants.ADD_COMMENT:
                _addComment(payload.action.id,payload.action.user,payload.action.text);
                break;
        }

        AppStore.emitChange();
        return true;
    })
})

module.exports = SprayStore;

