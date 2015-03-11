/** @jsx React.DOM */
var React = require('react');
var mui = require('material-ui');

var Paper = mui.Paper;
var FlatButton = mui.FlatButton;
var Icon = mui.Icon;

var FeedItem =
    React.createClass({
        openLink:function(){
            chrome.tabs.create({'url': this.props.page.url});
        },
        render:function(){
            var page = this.props.page;
            var domain = page.url.split('//');
            domain.shift();
            domain = domain[0].split('/')[0];
            var iconStr = 'image-filter-'+(page.sprays.length > 9 ? 9 : page.sprays.length);

            return (
                <Paper zDepth={1}>
                    <div className="row">
                        <div className="col-xs-9">
                            <span className="muted">{domain}</span>
                            <p>{page.title}</p>
                        </div>
                        <div className="col-xs-3">
                            <h3 className="action-icon">
                                <Icon icon={iconStr} />
                            </h3>
                            <h3 onClick={this.openLink} className="action-icon">
                                <Icon icon={"action-open-in-new"} />
                            </h3>
                        </div>
                    </div>
                </Paper>
            )
        }
    });
module.exports = FeedItem;