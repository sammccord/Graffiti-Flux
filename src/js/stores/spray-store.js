var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');

var ExtActions = require('../actions/ext-actions');

var merge = require('react/lib/merge');
var BaseStore = require('./base-store');
var _ = require('lodash');

var _sprays = [];

function _addReply(index, reply){

}

var SprayStore = merge(BaseStore, {
    getSprays: function(){
        return _sprays;
    },

    dispatcherIndex:AppDispatcher.register(function(payload){
        var action = payload.action;
        switch(action.actionType){
            case AppConstants.LOAD_SPRAYS:
                _sprays = action.sprays;
                SprayStore.emitChange();
                break;
            case AppConstants.ADD_SPRAY:
                console.log(action.spray);
                Array.prototype.push.apply(_sprays,[action.spray]);
                SprayStore.emitChange();
                break;
        }

        return true;
    })
})

module.exports = SprayStore;

