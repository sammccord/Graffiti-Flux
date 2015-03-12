/** @jsx React.DOM */
var React = require('react');
var mui = require('material-ui');

var ExtActions = require('../../actions/ext-actions');
var FeedStore = require('../../stores/feed-store');

var FeedItem = require('./feed-item');

var Paper = mui.Paper;
var FlatButton = mui.FlatButton;
var Icon = mui.Icon;

var getFeed = function(){
    return FeedStore.getFeed();
};

var Feed =
    React.createClass({
        getInitialState: function(){
            return getFeed();
        },
        _onChange:function(){
            this.setState(getFeed());
            console.log(getFeed());
        },
        componentWillMount:function(){
            ExtActions.getFeed();
            FeedStore.addChangeListener(this._onChange);
        },
        componentDidUnmount:function(){
            FeedStore.removeChangeListener(this._onChange);
        },
        render:function(){
            var classStr = 'action-tabs';
            if(this.props.index > 0){
                classStr += ' graffiti-hide'
            }
            classStr += ' tab-'+this.props.index;

            console.log(this.state.pages);
            var pages = this.state.pages.map(function(page){
                return <FeedItem page={page} />
            });

            return (
                    <div className={classStr}>
                        {pages}
                    </div>
                )
        }
    });
module.exports = Feed;