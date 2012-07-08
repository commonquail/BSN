// ==UserScript==
// @name          BioWare Social Network: Home
// @namespace     quail
// @version       1.6.2
// @updateURL     http://userscripts.org/scripts/source/127615.user.js
// @description   Companion script for user style http://bit.ly/zDe42J. Further
//                details on script page.
// @include       http://social.bioware.com/user_home.php*
// @include       http://social.bioware.com/forum*
// @include       http://social.bioware.com/group/*/discussion/*
// ==/UserScript==
function $(id) { return document.getElementById(id); };

// GPL http://ufku.com/personal/bbc2html
function BBC2HTML(S) {
  if (S.indexOf('[') < 0) {return S;}

  function X(p, f) {return new RegExp(p, f);}
  function D(s) {return rD.exec(s);}
  function R(s) {return s.replace(rB, P);}
  function A(s, p) {for (var i in p) s = s.replace(X(i, 'g'), p[i]); return s;}

  function P($0, $1, $2, $3) {
    if ($3 && $3.indexOf('[') > -1) $3 = R($3);
    switch ($1) {
      case 'url': return '<a '+ L[$1] + ($2||$3) +'">'+ $3 +'</a>';
      case 'b':case 'i':case 'u':case 's': return '<'+ $1 +'>'+ $3 +'</'+ $1 +'>';
    }
    return '['+ $1 + ($2 ? '='+ $2 : '') +']'+ $3 +'[/'+ $1 +']';
  }

  var rB = X('\\[([a-z][a-z0-9]*)(?:=([^\\]]+))?]((?:.|[\r\n])*?)\\[/\\1]', 'g'), rD = X('^(\\d+)x(\\d+)$');
  var L = {url: 'href="', 'anchor': 'name="', email: 'href="mailto: '};
  var I = {}, B = {};

  B['\\[list]'] = '<ul>'; B['\\[list=(\\w)]'] = function($0, $1) {return '<ul style="list-style-type: '+ (U[$1]||'disc') +'">'}; B['\\[/list]'] = '</ul>'; B['\\[\\*]'] = '<li>';
  return R(A(A(S, I), B));
}

function textAreaAdjust(o) {
    o.style.height = "1px";
    o.style.height = (20+o.scrollHeight)+"px";
}

(function () {
  var o;
  if (document.URL.indexOf('user_home.php') >= 0) {
    o = $('content_right_column').childNodes;
    if (o[3].childNodes[1].innerHTML == 'Group Subscriptions') {
      $('sidebar').appendChild(o[3]);
    }
  } else if (document.URL.indexOf('forum') >= 0) {
    document.forms[1].innerHTML = '<form action="http://www.google.com/search" method="get"><div class="searchwrapper"><input type="hidden" value="social.bioware.com" name="sitesearch"><input type="text" value="" name="q" style="width:300px" class="search"><input type="submit" value="Google Search" ></div></form>';
  } else if (document.URL.indexOf('discussion/') >= 0) {
    unsafeWindow.editPost = function(id) {
      o = $('post_' + id).nextSibling.nextSibling.childNodes[1].childNodes[0].childNodes[3].childNodes[1].childNodes[1].childNodes[5];
      if (unsafeWindow.isEditing) {
        if ($('post_edit_' + id).value === '') {
          alert('Please enter a message to post.');
          return false;
        }
        $('editPostForm').submit();
        o.innerHTML = '<span>Saving...</span>';
        unsafeWindow.isEditing = false;
        setTimeout(function() { o.innerHTML = '<a href="javascript:void(0);" onclick="editPost(\'' + id + '\');"><img src="http://na.llnet.bioware.cdn.ea.com/u/f/eagames/bioware/social/images/icons/group_edit16.gif" class="button" style="float:left;" border="0">Edit Post</a>'; }, 1000);
        setTimeout(function() {(function (e) {e.innerHTML = BBC2HTML(e.innerHTML);})($('post_div_' + id));}, 800);
      } else {
        unsafeWindow.isEditing = true;
        o.innerHTML = '<a href="javascript:void(0);" onclick="editPost(\'' + id + '\');"><img src="http://na.llnet.bioware.cdn.ea.com/u/f/eagames/bioware/social/images/icons/group_edit16.gif" class="button" style="float: left;" border="0">Save Post</a>';
        var postElement = $('post_div_' + id);
        var height = postElement.offsetHeight + 10;
        var postText = $('post_body_' + id).innerHTML.replace(/<br>/gi, '\r\n').replace(/>/gi, '&gt;');
        var pathArray = window.location.pathname.split('/');
        var group_id = pathArray[2];
        var topic_id = pathArray[4];
        
        postElement.innerHTML = [
          "<form action='group_discussion_view.php' method='post' target='ajaxframe' name='editPostForm' id='editPostForm'>",
          "<textarea name='grouppost_body' id='post_edit_", id,
          "' style='height: ", height, "px; width:100%;'>", postText, "</textarea>",
          "<input type='hidden' name='task' value='post_edit'>",
          "<input type='hidden' name='grouppost_id' value='", id, "'>",
          "<input type='hidden' name='group_id' value='", group_id, "'>",
          "<input type='hidden' name='grouptopic_id' value='", topic_id, "'>",
          "</form>"].join('');

        // Inject
        unsafeWindow.textarea_autogrow('post_edit_' + id);
        $('post_edit_' + id).focus();
      }
    } // editPost()
    
    unsafeWindow.quote = function(id, user) {
      var sel = '';
      if (window.getSelection && window.getSelection().anchorNode &&
         (window.getSelection().anchorNode.parentNode.id.substr(9)) === id) {
        sel = window.getSelection().toString();
      }
      o = $('group_discussion_reply');
      o.value += [(o.value !== '' ? '\r\n' : ''), '[quote=', user, ']\r\n',
          (sel ? sel : $('post_body_' + id).innerHTML).replace(/<br>/g, '\r\n'),
          '\r\n[/quote]\r\n'].join('');
      textAreaAdjust(o);
    } // quote()
  }
}());