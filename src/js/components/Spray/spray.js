var React = require('react'),
    mui = require('material-ui'),
    Paper = mui.Paper;
var $ = require('jquery');

var ExtActions = require('../../actions/ext-actions.js');

var SprayStore = require('../../stores/spray-store');
var PageStore = require('../../stores/page-store');

var Comments = require('../Comments/comments');
var CommentForm = require('../Comments/comment-form');

function setSprayState(){
    return {
        spray:this.props.spray
    };
}

$(window).resize(function() {
   $('[data-spray-id]').each(function(index){
       var id = $(this).attr('data-spray-id');
       var offset = $('[data-graffiti-id="'+id+'"]').offset().top;
       $(this).css({
           top:offset+'px'
       });
       $('[data-spray-container="'+id+'"]').css({
           top:offset-70+'px'
       });
   });
});

function highlightSpray(spray) {
        console.log('HEY');
        // var formatted = spray.targetText.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
        var formatted = spray.targetText.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        var regex = new RegExp("(" + formatted + ")", "gm")

        $('p.graffiti-selectable:not(#graffiti-app *)').contents().filter(function () {
            return this.nodeType === 3;
        }).each(function () {
            $(this).replaceWith($(this).text().replace(regex, '<span class="graffiti-spray" data-graffiti-id="' + spray._id + '">$1</span>'));
        });
}

var Spray =
    React.createClass({
        getInitialState: function(){
            return setSprayState.bind(this)();
        },
        _onChange:function(){
            this.setState(setSprayState.bind(this)());
        },
        componentWillMount:function(){
            SprayStore.addChangeListener(this._onChange)
        },
        componentDidUnmount:function(){
            SprayStore.removeChangeListener(this._onChange);
        },
        componentDidMount:function(){
            highlightSpray(this.state.spray);
            var offset = $('[data-graffiti-id="'+this.state.spray._id+'"]').offset().top;
            $('body').prepend('<div data-spray-id="'+this.state.spray._id+'" class="spray-tab" style="background-color:'+this.state.spray.spray_color+';top:'+offset+'px"></div>');

            $('[data-spray-container="'+this.state.spray._id+'"]').css('top',(offset-70)+'px');

            $('[data-spray-id="'+this.state.spray._id+'"]').on('click',function(){
                $('.graffiti-comments-container').removeClass('graffiti-show');
                $('[data-spray-container="'+$(this).attr('data-spray-id')+'"]').addClass('graffiti-show');
            })
        },
        handleCommentSubmit: function(user,text){
            var spray_id = this.state.spray._id;
            ExtActions.addComment(spray_id,user,text);
        },
        render: function (){
            var containerClassName = "graffiti-comments-container";

            var className = 'spray-tab';
            className += ' '+this.state.spray._id;

            var tabStyle={
                backgroundColor:this.state.spray.spray_color
            };

            return (
                    <Paper data-spray-container={this.state.spray._id} className={containerClassName} zDepth={1}>
                        <CommentForm sprayId={this.state.spray._id} onCommentSubmit={this.handleCommentSubmit}/>
                    <ul>
                        <Comments comments={this.state.spray.comments}/>
                    </ul>
                    </Paper>
            )
        }

    })

module.exports = Spray;
