var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');
var merge = require('react/lib/merge');
var BaseStore = require('./base-store');
var _ = require('lodash');

var CHANGE_EVENT = "sprays";

var _sprays = [
        {
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

function _addComment (index,comment) {
    _sprays[index].comments.push(comment);
}

function _addReply(index, reply){

}

var SprayStore = merge(BaseStore, {
    getSprays: function(){
        return _sprays;
    },

    dispatcherIndex:AppDispatcher.register(function(payload){
        var action = payload.action;

        switch(action.actionType){
            case AppConstants.ADD_COMMENT:
                _addComment(payload.action.comment);
                break;
        }

        AppStore.emitChange();
        return true;
    })
})

module.exports = SprayStore;

