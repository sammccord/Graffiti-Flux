var React = require('react'),
    mui = require('material-ui'),
    Paper = mui.Paper,
    Tabs = mui.Tabs,
    Tab = mui.Tab;

var BodyShim = require('./Panel/body-shim');
var Icon = mui.Icon;

var panels = {
    "tabs":[
        "Profile",
        "Groups",
        "Feed"
    ],
    bodies:[
        require('./Profile/profile'),
        require('./Groups/groups'),
        require('./Feed/feed')
    ],
    icons:[
        "content-add",
        "image-remove-red-eye",
        "action-question-answer"
    ]
};

var APP =
    React.createClass({
        getInitialState: function(){
            return panels;
        },
        render: function (){
            var bodies = this.state.tabs.map(function(tab,index){
                var Panel = panels.bodies[index];
                return <Panel index={index} />;
            });

            var tabs = this.state.tabs.map(function(tab,index){
                var body = <BodyShim index={index}/>;
                var icon = <Icon icon={panels.icons[index]} />;

                return <Tab label={icon} children={body}>
                </Tab>
            }.bind(this));

            return (
                <div>
                <Tabs>
                    {tabs}
                </Tabs>
                <div className="container">
                    {bodies}
                </div>
                    </div>
            )
        }

    });

module.exports = APP;
