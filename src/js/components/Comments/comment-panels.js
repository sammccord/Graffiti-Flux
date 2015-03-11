var React = require('react'),
    mui = require('material-ui'),
    Paper = mui.Paper,
    Tabs = mui.Tabs,
    Tab = mui.Tab;

var UserStore = require('../../stores/user-store');

var CommentForm = require('./comment-form');
var Comments = require('./comments');
var BodyShim = require('./body-shim');
var Icon = mui.Icon;

function setSprayState(){
    return {
        groups:UserStore.getIdentities()
    };
}

var APP =
    React.createClass({
        getInitialState: function(){
            return setSprayState();
        },
        render: function (){
            var groups = [];

            var bodies = this.props.sprays.map(function(spray,index){
                var name = '';
                var user = '';
                this.state.groups.forEach(function(group){
                    if(spray.org_id === group.organization_id){
                        user = group.name;
                        name = group.organization;
                        groups.push(group.organization);
                    }
                });

                return (
                        <Comments key={spray._id} name={user} sprayId={spray._id} comments={spray.comments} index={index} />
                    )
            }.bind(this));



            var tabs = groups.map(function(group,index){
                var body = <BodyShim index={index}/>;


                return <Tab label={group} children={body}>
                </Tab>
            }.bind(this));

            return (
                <div>
                    <Tabs>
                    {tabs}
                    </Tabs>
                    <div >
                    {bodies}
                    </div>
                </div>
            )
        }

    });

module.exports = APP;
