// ==UserScript==
// @name          BioWare Social Network: Home
// @namespace     quail
// @version       1.1.1
// @updateURL     http://userscripts.org/scripts/source/127615.user.js
// @description   Move the right sidebar, when important, to the left sidebar.
//                This is meant to be used with http://bit.ly/zDe42J, which
//                hides the right sidebar.
// @include       http://social.bioware.com/user_home.php*
// @include       http://social.bioware.com/group/*
// @include       http://social.bioware.com/project/*
// @include       http://social.bioware.com/browse_b*
// ==/UserScript==
(function () {
  x = document.getElementById('content_right_column');
  if (document.URL.indexOf('user_home.php') >= 0) {
    if (x.childNodes[3].childNodes[1].innerHTML == 'Group Subscriptions') {
      document.getElementById('sidebar').appendChild(x.childNodes[3]);
    }
  }
  else {
    x.removeAttribute('id');
    document.getElementById('sidebar').appendChild(x);
    x.style.position = 'static';
    x.style.margin = 0;
  }
}());