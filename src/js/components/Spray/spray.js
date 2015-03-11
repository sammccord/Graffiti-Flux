var React = require('react'),
    mui = require('material-ui'),
    Paper = mui.Paper;
var $ = require('jquery');

var ExtActions = require('../../actions/ext-actions.js');

var CommentPanels = require('../Comments/comment-panels');

function setSprayState(){
    return {
        spray:this.props.spray[0],
        sprays: this.props.spray
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

    var regex = new RegExp(spray.targetText, "gm");

    console.log(regex);
    console.log('AT INDEX',spray.p_index);
    var el = $('p.graffiti-selectable').eq(parseInt(spray.p_index));

    var regex = new RegExp(spray.targetText, "gm");
    var body = spray.targetText.replace(/[-[\]{}()*+?.,\/\\^$|#\s]/gm,"$&");

    el.html(el.html().replaceCallback(regex,'<span class="graffiti-spray" data-graffiti-id="'+spray._id+'">'+body+'</span>',function(){
        console.log(el)
    }));
}

var Spray =
    React.createClass({
        getInitialState: function(){
            return setSprayState.bind(this)();
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
                $('.graffiti-comments-container,.freshSprayContainer').removeClass('graffiti-show');
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
        render: function (){
            console.log('SPRAY COMP ',this.props.spray);
            var containerClassName = "graffiti-bind graffiti-comments-container";

            var className = 'spray-tab';
            className += ' '+this.state.spray._id;

            var tabStyle={
                backgroundColor:this.state.spray.spray_color
            };

            return (
                <Paper data-spray-container={this.state.spray._id} className={containerClassName} zDepth={1}>
                    <CommentPanels sprays={this.state.sprays} />
                </Paper>
            )
        }

    })

module.exports = Spray;
