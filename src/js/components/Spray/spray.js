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
        // var formatted = spray.targetText.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
        var formatted = spray.targetText.replace(/[-\/\\\-\s^:,’'$*+?.()|[\]{}<>=]/g, '\\$&');
        var regex = new RegExp("(" + formatted + ")", "gm");

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
        expandTabs:function(){
            $('.spray-tab').addClass('graffiti-expanded');
            $('.graffiti-spray').addClass('graffiti-highlight');
        },
        shrinkTabs:function(){
            $('.spray-tab').removeClass('graffiti-expanded graffiti-focus');
            $('.graffiti-spray').removeClass('graffiti-highlight');
            $('[data-graffiti-id]').removeClass('graffiti-focus');
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
            $('body').prepend('<div data-spray-id="'+this.state.spray._id+'" class="spray-tab graffiti-bind" style="background-color:'+this.state.spray.spray_color+';top:'+offset+'px"><span class="comment-count">'+this.state.spray.comments.length+'</span></span></div>');

            $('[data-spray-container="'+this.state.spray._id+'"]').css({
                'top':(offset-70)+'px',
                'margin-top':((this.state.spray.comments.length * 20)*-1)+'px'
            });

            var sprayEl = $('[data-spray-id="'+this.state.spray._id+'"]');

            sprayEl.on('click',function(e){
                $('.graffiti-comments-container').removeClass('graffiti-show');
                $('[data-spray-container="'+$(this).attr('data-spray-id')+'"]').addClass('graffiti-show');
            }).on('mouseenter',function(){
                this.expandTabs();
                sprayEl.addClass('graffiti-focus');
                $('[data-graffiti-id="'+this.state.spray._id+'"]').addClass('graffiti-focus');
            }.bind(this))
                .on('mouseleave',function(){
                    this.shrinkTabs();
                }.bind(this));

        },
        handleCommentSubmit: function(user,text){
            var spray_id = this.state.spray._id;
            ExtActions.addComment(spray_id,user,text);
        },
        render: function (){
            var containerClassName = "graffiti-bind graffiti-comments-container";

            var className = 'spray-tab';
            className += ' '+this.state.spray._id;

            var tabStyle={
                backgroundColor:this.state.spray.spray_color
            };

            return (
                    <Paper data-spray-container={this.state.spray._id} className={containerClassName} zDepth={1}>
                        <CommentForm sprayId={this.state.spray._id} onCommentSubmit={this.handleCommentSubmit}/>
                    <ul className="graffiti-bind">
                        <Comments comments={this.state.spray.comments}/>
                    </ul>
                    </Paper>
            )
        }

    })

module.exports = Spray;
