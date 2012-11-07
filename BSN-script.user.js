// ==UserScript==
// @name          BioWare Social Network: Home
// @namespace     quail
// @version       1.8.3
// @updateURL     http://userscripts.org/scripts/source/127615.user.js
// @grant         none
// @require       http://raw.github.com/eligrey/FileSaver.js/master/FileSaver.min.js
// @description   Companion script for user style http://bit.ly/zDe42J. Further
//                details on script page.
// @include       http://social.bioware.com/*
// ==/UserScript==
(function () {
  function $(id) { return document.getElementById(id); };

  var o;
  var uw = (this.unsafeWindow) ? this.unsafeWindow : window;
  
  if (document.URL.indexOf('user_home.php') >= 0) {
    o = $('content_right_column').childNodes;
    if (o[3].childNodes[1].innerHTML == 'Group Subscriptions') {
      $('sidebar').appendChild(o[3]);
    }
  } else if (document.URL.indexOf('forum') >= 0) {
    // Inject Google site search in place of broken forum search.
    document.forms[1].innerHTML = '<form action="http://www.google.com/search" method="get"><div class="searchwrapper"><input type="hidden" value="social.bioware.com" name="sitesearch"><input type="text" value="" name="q" style="width:300px" class="search"><input type="submit" value="Google Search" ></div></form>';
  } else if (document.URL.indexOf('/discussion/') >= 0) {
    uw.editPost = editPost;
    uw.quote = quote;
    var post = document.getElementById('content').childNodes[15];
    var nav = document.getElementById('content').childNodes[15].childNodes[1].childNodes[0].childNodes[3].childNodes[1];
    post.parentNode.insertBefore(nav, post);
    nav.childNodes[1].childNodes[0].childNodes[3].setAttribute('align', 'center');
    post.childNodes[1].childNodes[0].childNodes[1].childNodes[3].childNodes[3].childNodes[1].style.width="760px"
  } else if (document.URL.indexOf('user_messages_view') >= 0) {
    uw.exportPM = exportPM;
    var p = document.createElement('p');
    var contentNodes = $('content').childNodes;
    var name = contentNodes[5].textContent.replace(/[^-_.a-zA-Z0-9 ]/g, "");
    name = name || 'unnamed';
    p.innerHTML = ['<a href="#" download="', name,
      '.html" onClick="return exportPM(\'', name,
      '\');">Export PM as HTML</a>'].join('');
    contentNodes[7].appendChild(p);
    var separatorTR = contentNodes[15].children[0].children[contentNodes[15].children[0].children.length - 2];
    separatorTR.innerHTML = '<td colspan="2">&nbsp;</td><td><a href="' + location.pathname + location.search + '#content">Top</a></td>'
  }
  // This needs to be queued since the ME3 bar is JS driven and starts empty.
  setTimeout(hideDowntimeME3Bar, 0);

  function exportPM(name) {
    var contentNodes = contentNodes || $('content').childNodes;
    var postNodes = contentNodes[15].children[0].children;
    var posts = [],
    authors = [],
    output = [];
    
    /* The last two elements make up the reply form. */
    for (var i = 0; i < postNodes.length - 2; i = i+2) {
      var author = postNodes[i].children[1].children[0];
      var time = postNodes[i].children[1].children[1].innerHTML;
      var text = postNodes[i].children[2].innerHTML;
      if (!authors[author.textContent]) {
        authors.push(author);
        authors[author.textContent] = 'author' + authors.length;
      }
      posts.push({author: author, time: time, text: text});
    }

    output.push('<html><head><style type="text/css">',
      'body {font-family: Calibri,Verdana, sans-serif;margin-bottom:5%;}',
      '#info{margin: 0px auto 0px auto;max-width:800px;}',
      '#info h1,#info p{margin: 0px;}',
      'table{margin: 0px auto 0px auto;border-collapse:collapse;max-width:800px;}',
      'td {border-top: 2px solid white;}',
      '.name{margin:10px 10px 0px 10px;}',
      'a {text-decoration: none;}',
      'a:hover {color:blue!important;text-decoration: underline;}',
      'a:active{color:red!important;}',
      '.name a:visited, .name a{color: green;}',
      '.author{vertical-align: top;}',
      '.author1{background-color:hsl(43,72%,94%);}',
      '.author2{background-color:hsl(78,41%,92%);}',
      '.author3{background-color:hsl(68,17%,91%);}',
      '.author4{background-color:hsl(156,15%,94%);}',
      '.author5{background-color:hsl(55,63%,85%);}',
      '.author6{background-color:hsl(28,97%,89%);}',
      '.author1 td:first-of-type{background-color:hsl(43,72%,84%);}',
      '.author2 td:first-of-type{background-color:hsl(78,41%,82%);}',
      '.author3 td:first-of-type{background-color:hsl(68,17%,81%);}',
      '.author4 td:first-of-type{background-color:hsl(156,15%,84%);}',
      '.author5 td:first-of-type{background-color:hsl(55,63%,75%);}',
      '.author6 td:first-of-type{background-color:hsl(28,97%,79%);}',
      '.time{font-size: 0.7em;color:gray;margin:0px 10px 10px 10px;}',
      '.text{max-width:700px;padding:10px;}',
      '</style></head><body>',
      '<div id="info"><h1>', name, '</h1>',
      '<p>', posts.length, ' posts</p>',
      '<p>First post: ', posts[0].time, '</p>',
      '<p>Last post: ', posts[posts.length - 1].time, '</p>',
      '<p>Participants: ', authors.map(function(x) { return x.innerHTML; }).join(', '), '</p></div><table><tbody>');

    for (var i = 0; i < posts.length; ++i) {
      output.push('\n<tr class="', authors[posts[i].author.textContent],
        '"><td class="author"><div class="name">', posts[i].author.innerHTML,
        '</div><div class="time">', posts[i].time,
        '</div></td><td class="text">', posts[i].text, '</td></tr>');
    }
    
    output.push('</tbody></table></body></html>');
    saveAs(new Blob(output, { 'type' : 'text/html;charset=utf-8' }), name + '.html');
    return false;
  };

  // There is a bit of downtime after operation completion, hide the bar until
  // the next operation is announced.
  function hideDowntimeME3Bar() {
    if (!$("textA").innerHTML.match(/(gin in |u have )$/)) {
      $('me3bar').style.display = "none";
      $('page_body').style.backgroundPosition = "center 0";
    }
  }
  
  function editPost(id) {
    // Edit button.
    o = $('post_' + id).nextSibling.nextSibling.childNodes[1].childNodes[0].childNodes[3].childNodes[1].childNodes[1].childNodes[5];
    if (uw.isEditing) {
      if ($('post_edit_' + id).value === '') {
        alert('Please enter a message to post.');
        return false;
      }
      $('editPostForm').submit();
      o.innerHTML = '<span>Saving...</span>';
      uw.isEditing = false;
      setTimeout(function() { o.innerHTML = '<a href="javascript:void(0);" onclick="editPost(\'' + id + '\');"><img src="http://na.llnet.bioware.cdn.ea.com/u/f/eagames/bioware/social/images/icons/group_edit16.gif" class="button" style="float:left;" border="0">Edit Post</a>'; }, 1000);
      setTimeout(function() {(function (e) {e.innerHTML = BBC2HTML(e.innerHTML);})($('post_div_' + id));}, 800);
    } else {
      uw.isEditing = true;
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
      uw.textarea_autogrow('post_edit_' + id);
      $('post_edit_' + id).focus();
    }
  } // editPost()

  function quote(id, user) {
    var sel = '';
    var origPoster = '';
    // Is there a selection?
    if (window.getSelection && window.getSelection().anchorNode) {
      o = window.getSelection().anchorNode.parentNode;
      // Is the selection inside another quote?
      if (o.className === 'group_discussion_quote' ||
          o.className === 'postQuote') {
        origPoster = o.firstChild.innerHTML.substr(0,
          o.firstChild.innerHTML.indexOf(' said:'));
        o = o.parentNode;
      }
      while (o.className === 'group_discussion_quote' ||
             o.className === 'postQuote') {
        o = o.parentNode;
      }
      // Does the selection belong to the quoted post?
      if (o.id.substr(9) === id) {
        sel = (origPoster ? '[quote=' + origPoster + ']\r\n' : '') +
          window.getSelection().toString() + (origPoster ? '[/quote]' : '');
      }
    }
    o = $('group_discussion_reply');
    o.value += [(o.value !== '' ? '\r\n' : ''), '[quote=', user, ']\r\n',
        (sel ? sel : $('post_body_' + id).innerHTML).replace(/<br>/g, '\r\n'),
        '\r\n[/quote]\r\n'].join('');
    textAreaAdjust(o);
    // Indicate the post was quoted.
    o = $('post_' + id).nextSibling.nextSibling.childNodes[1].childNodes[0].childNodes[3].childNodes[1].childNodes[1].lastChild.previousSibling;
    o.innerHTML = "Quoted";
    setTimeout(function() {(function (e) {e.innerHTML = '<a onclick="quote(\'' + id + '\', \'' + user + '\');" href="javascript:void(0);"><img style="float:left;" class="button" src="http://na.llnet.bioware.cdn.ea.com/u/f/eagames/bioware/social/images/icons/group_discussion_quote16.gif">Quote</a>';})(o);}, 800);
  } // quote()

  // GPL http://ufku.com/personal/bbc2html 
  function BBC2HTML(S) {
    if (S.indexOf('[') < 0) {return S;}

    function X(p, f) {return new RegExp(p, f);}
    function D(s) {return rD.exec(s);}
    function R(s) {return s.replace(rB, P);}
    function A(s, p) {for (var i in p) s = s.replace(X(i, 'g'), p[i]); return s;}

    function P($0, $1, $2, $3) {
      if ($3 && $3.indexOf('[') > -1) $3 = R($3);
      switch ($1.toLowerCase()) {
        case 'url': return '<a '+ L[$1] + ($2||$3) +'">'+ $3 +'</a>';
        case 'img': var d = D($2); return '<img src="'+ $3 +'" class="bb-image"/>';
        case 'b':case 'i':case 'u':case 's': return '<'+ $1 +'>'+ $3 +'</'+ $1 +'>';
      }
      return '['+ $1 + ($2 ? '='+ $2 : '') +']'+ $3 +'[/'+ $1 +']';
    }

    var rB = X('\\[([A-z][A-z0-9]*)(?:=([^\\]]+))?]((?:.|[\r\n])*?)\\[/\\1]', 'g'), rD = X('^(\\d+)x(\\d+)$');
    var L = {url: 'href="', anchor: 'name="', email: 'href="mailto: '};
    var I = {}, B = {};

    B['\\[list]'] = '<ul>'; B['\\[list=(\\w)]'] = function($0, $1) {return '<ul style="list-style-type: '+ (U[$1]||'disc') +'">'}; B['\\[/list]'] = '</ul>'; B['\\[\\*]'] = '<li>';
    return R(A(A(S, I), B));
  }

  function textAreaAdjust(e) {
      e.style.height = "1px";
      e.style.height = (20+e.scrollHeight)+"px";
  }
}());