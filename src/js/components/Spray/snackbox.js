var React = require('react');
var $ = require('jquery');

var Snackbox = React.createClass({
    handleClick:function(){
        var id = this.props.target;
        $('.graffiti-comments-container,.freshSprayContainer').removeClass('graffiti-show');
        $('[data-spray-container="'+id+'"]').addClass('graffiti-show');
        $('.mui-snackbar').removeClass('mui-is-open');
    },
    componentDidMount:function(){
        $('#snack-'+this.props.target).addClass('mui-is-open');
        setTimeout(function(){
            $('.graffiti-snack').removeClass('mui-is-open');
        },3000)
    },
   render:function(){
       var style={
        height:"88px",
           top:"-26px"
       };
       var id="snack-"+this.props.target;

       return (
           <span id={id} className="graffiti-snack mui-snackbar">
               <span className="mui-snackbar-message">Tag Added</span>
               <button onClick={this.handleClick} className="mui-snackbar-action mui-flat-button mui-enhanced-button">
                   <div>
                       <div className="mui-touch-ripple">
                           <div className="mui-ripple-circle">
                               <div className="mui-ripple-circle-inner"></div>
                           </div>
                       </div><span className="mui-flat-button-label">view</span>
                   </div>
                   <div className="mui-focus-ripple" style={style}>
                       <div className="mui-focus-ripple-inner"></div>
                   </div>
               </button>
           </span>
       )
   }
});

module.exports = Snackbox;