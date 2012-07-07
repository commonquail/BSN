// ==UserScript==
// @name          BioWare Social Network: Home
// @namespace     quail
// @version       1.4.2
// @updateURL     http://userscripts.org/scripts/source/127615.user.js
// @description   Companion script for user style http://bit.ly/zDe42J. Further
//                details on script page.
// @include       http://social.bioware.com/user_home.php*
// @include       http://social.bioware.com/forum*
// @include       http://social.bioware.com/group/*/discussion/*
// ==/UserScript==
(function () {
  if (document.URL.indexOf('user_home.php') >= 0) {
    x = document.getElementById('content_right_column').childNodes;
    if (x[3].childNodes[1].innerHTML == 'Group Subscriptions') {
      document.getElementById('sidebar').appendChild(x[3]);
    }
  } else if (document.URL.indexOf('forum') >= 0) {
    document.forms[1].innerHTML = '<form action="http://www.google.com/search" method="get"><div class="searchwrapper"><input type="hidden" value="social.bioware.com" name="sitesearch"><input type="text" value="" name="q" style="width:300px" class="search"><input type="submit" value="Google Search" ></div></form>';
    
    
    
  } else {
    
    
    
    unsafeWindow.editPost = function(id) {
      if (unsafeWindow.isEditing) {
        if (document.getElementById('post_edit_'+id).value === '') {
          alert('Please enter a message to post.');
          return false;
        }
        unsafeWindow.isEditing = false;
        document.getElementById('editPostForm').submit();
      } else {
        unsafeWindow.isEditing = true;
        var postElement = document.getElementById('post_div_' + id);
        var height = postElement.offsetHeight + 10;
        var postText = document.getElementById('post_body_'+id).innerHTML.replace(/<br>/gi, '\r\n').replace(/>/gi, '&gt;');
        var pathArray = window.location.pathname.split('/');
        var group_id = pathArray[2];
        var topic_id = pathArray[4];
        
        postElement.innerHTML = [
          "<form action='group_discussion_view.php' method='post' target='ajaxframe' name='editPostForm' id='editPostForm'>",
          "<textarea name='grouppost_body' id='post_edit_" + id + "' style='height: " + height +"px; width: 100%;'>" + postText + "</textarea>",
          "<input type='hidden' name='task' value='post_edit'>",
          "<input type='hidden' name='grouppost_id' value='" + id + "'>",
          "<input type='hidden' name='group_id' value='" + group_id + "'>",
          "<input type='hidden' name='grouptopic_id' value='" + topic_id + "'>",
          "</form>"].join('');

        // Inject
        unsafeWindow.textarea_autogrow('post_edit_' + id);
        document.getElementById('post_edit_' + id).focus();
      }
    }
  }
}());