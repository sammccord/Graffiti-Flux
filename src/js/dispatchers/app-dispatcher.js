var merge = require('react/lib/merge');
var Dispatcher = require('./dispatcher');

var AppDispatcher = merge(Dispatcher.prototype, {
    handleViewAction: function (action) {
        this.dispatch({
            source: 'VIEW_ACTION',
            action: action
        });
    }
});

module.exports = AppDispatcher;
