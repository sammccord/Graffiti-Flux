var React = require('react');

var ExtActions = require('../../actions/ext-actions');
var AppActions = require('../../actions/app-actions');

var mui = require('material-ui'),
    TextField = mui.TextField,
    RaisedButton = mui.RaisedButton,
    Paper = mui.Paper;

var PageStore = require('../../stores/page-store');
var UserStore = require('../../stores/user-store');
var $ = require('jquery');

String.prototype.replaceCallback= function(regex,string,cb){
    var ret = String.prototype.replace.call(this,regex,string);
    if(typeof cb === 'function'){
        cb.call(ret); // Call your callback
    }
    return ret;  // For chaining
};

String.prototype.splice = function( idx, rem, s ) {
    return (this.slice(0,idx) + s + this.slice(idx + Math.abs(rem)));
};

function bindSelection(){
    var state = this;
    $('p:not(#graffiti-app *)').addClass('graffiti-selectable');
    $('.graffiti-selectable').on('mouseenter',function(){
       $('.graffiti-spray').addClass('graffiti-highlight')
    }).on('mouseleave',function(){
        $('.graffiti-spray').removeClass('graffiti-highlight')
    });
    $('.graffiti-selectable').on('selectstart', function(e) {
        $('.freshSprayContainer').removeClass('graffiti-visible');
        $('#graffiti-spray').contents().unwrap();
        $(document).one('mouseup', function(e) {
            var selection = window.getSelection();
            if(selection.type!=="Range") return false;
            console.log(window.getSelection());
            var offset = e.pageY;

            var p = $('p.graffiti-selectable');

            var html = "";
            if (typeof window.getSelection != "undefined") {
                var sel = window.getSelection();
                if (sel.rangeCount) {
                    var container = document.createElement("div");
                    for (var i = 0, len = sel.rangeCount; i < len; ++i) {
                        container.appendChild(sel.getRangeAt(i).cloneContents());
                    }
                    html = container.innerHTML;
                }
            } else if (typeof document.selection != "undefined") {
                if (document.selection.type == "Text") {
                    html = document.selection.createRange().htmlText;
                }
            }

            var index = $('p.graffiti-selectable').index(selection.baseNode.parentNode);

            console.log(selection.baseNode.parentNode.innerHTML);
            console.log(html);

            state.setState({
                targetExp:html.replace(/[-[\]{}()*+?.,\/\\^$|#\s]/gm, "$&")
            });

        var regex = new RegExp(state.state.targetExp, "gm");
            $(selection.baseNode.parentNode).html($(selection.baseNode.parentNode).html().replaceCallback(regex,'<span id="graffiti-spray" data-graffiti-index="'+index+'">'+state.state.targetExp+'</span>',function(){
                    $('.freshSprayContainer').css({
                        top:(offset-100)+'px'
                    }).addClass('graffiti-show');

                    $('.graffiti-comments-container').removeClass('graffiti-show');
                    window.getSelection().removeAllRanges();
            }));


        });
    });
}

function getFormData(){
    return {
        page: PageStore.getPageState(),
        user: UserStore.getCurrentIdentity()
    };
}

function createPageAddFreshSpray(org_id,page_ref,targetText,name,text,p_index){
    console.log(org_id);
    if(!$('#graffiti-spray').length) {
        return;
    }
    ExtActions.createPageAddFreshSpray(org_id,page_ref,targetText,name,text,p_index);
}

function addFreshSpray(page_id,targetText,user,text,p_index){
    if(!$('#graffiti-spray').length) {
        return;
    }
    ExtActions.addSpray(page_id,targetText,user,text,p_index);
    AppActions.addSpray(page_id,targetText,user,text,p_index);
}

var FreshSpray =
    React.createClass({
        getInitialState: function(){
            bindSelection.bind(this)();
            return getFormData();
        },
        _onChange:function(){
            this.setState(getFormData());
        },
        componentWillMount:function(){
            PageStore.addChangeListener(this._onChange);
            UserStore.addChangeListener(this._onChange);
        },
        componentDidUnmount:function(){
            PageStore.removeChangeListener(this._onChange);
            UserStore.removeChangeListener(this._onChange);
        },
        handleSubmit: function(e){
            e.preventDefault();
            var text = document.getElementById('freshSprayInput').value;
            document.getElementById('freshSprayInput').value = '';
            if (!text || !$('#graffiti-spray').length) {
                return;
            }
            var targetText = this.state.targetExp;
            console.log(targetText);

            var index = document.getElementById('graffiti-spray').getAttribute('data-graffiti-index');

            if(this.state.page.fresh === true){
                createPageAddFreshSpray(this.state.user.organization_id,this.state.page.ref,targetText,this.state.user.name,text,index);
            }
            else{
                addFreshSpray(this.state.page._id,targetText,this.state.user.name,text,index);
            }
            $('#graffiti-spray').contents().unwrap();
            $('.freshSprayContainer').removeClass('graffiti-show');
            this.refs.text.getDOMNode().value = '';
            return;
        },
        render: function(){
            return (
                <Paper className="graffiti-bind freshSprayContainer" zDepth={1}>
                    <form onSubmit={this.handleSubmit}>
                        <TextField
                            className="graffiti-bind"
                            id="freshSprayInput"
                            hintText="Leave a comment"
                            multiLine={true} ref="text"/>
                        <RaisedButton className="graffiti-bind" type="submit" label="TAG+COMMENT" />
                    </form>
                </Paper>
            )
        }
    });

module.exports = FreshSpray;
