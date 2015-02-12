var merge = require('react/lib/merge');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var BaseStore = merge(EventEmitter.prototype, {

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(fn) {
        this.on(CHANGE_EVENT, fn);
    },

    removeChangeListener: function(fn) {
        this.removeListener(CHANGE_EVENT, fn);
    }

});

module.exports = BaseStore;