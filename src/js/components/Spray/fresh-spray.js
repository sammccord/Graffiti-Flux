var React = require('react');

var ExtActions = require('../../actions/ext-actions');

var mui = require('material-ui'),
    TextField = mui.TextField,
    FlatButton = mui.FlatButton,
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
    $('p:not(#graffiti-app *)').addClass('graffiti-selectable');
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
            console.log(html);
        var regex = new RegExp(html, "gm");
            console.log(regex);

            console.log(selection.baseNode.parentNode.innerHTML);
            //console.log(selection.baseNode.parentNode.innerHTML.replace(regex,'<span class="graffiti-spray" data-graffiti-target="'+html+'">'+selection.toString()+'</span>'));

            $(selection.baseNode.parentNode).html($(selection.baseNode.parentNode).html().replace(regex,'<span class="graffiti-spray" data-graffiti-target="'+selection.toString().replace(/[-[\]{}()"*+?.,\\^$|#\s]/g, "\\$&")+'">'+selection.toString()+'</span>'));

            window.getSelection().removeAllRanges();

            //replaceWith($(selection.baseNode.parentNode).html().replace(regex,'<span class="graffiti-spray">'+selection.toString()+'</span>'));
        //

        //$(selection.baseNode.parentNode).replaceWith($(selection.baseNode.parentNode).html().replaceCallback(regex, '<span id="graffiti-spray" data-graffiti-target="' + html + '">$1</span>',function(){
        //    $('.freshSprayContainer').css({
        //        top:(offset-100)+'px'
        //    }).addClass('graffiti-show');
        //}));


        });
    });
}

function getFormData(){
    return {
        page: PageStore.getPageState(),
        user: UserStore.getCurrentIdentity()
    };
}

function createPageAddFreshSpray(org_id,page_ref,targetText,name,text){
    console.log(org_id);
    ExtActions.createPageAddFreshSpray(org_id,page_ref,targetText,name,text);
}

function addFreshSpray(page_id,targetText,user,text){
    ExtActions.addSpray(page_id,targetText,user,text);
}

var FreshSpray =
    React.createClass({
        getInitialState: function(){
            bindSelection();
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
            var targetText = document.getElementById('graffiti-spray').getAttribute('data-graffiti-target');
            $('#graffiti-spray').contents().unwrap();

            if(this.state.page.fresh === true){
                createPageAddFreshSpray(this.state.user.organization_id,this.state.page.ref,targetText,this.state.user.name,text);
            }
            else{
                addFreshSpray(this.state.page._id,targetText,this.state.user.name,text);
            }

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
                        <FlatButton className="graffiti-bind freshSpraySubmit" type="submit" label="Tag and Comment" primary={true} />
                    </form>
                </Paper>
            )
        }
    });

module.exports = FreshSpray;
