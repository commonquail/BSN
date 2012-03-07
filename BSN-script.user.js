// ==UserScript==
// @name          BioWare Social Network: Home
// @namespace     quail
// @version       1.2.1
// @updateURL     http://userscripts.org/scripts/source/127615.user.js
// @description   Move the Group Subscriptions block in the right sidebar, when
//                present, to the left sidebar. This is meant to be used with
//                http://bit.ly/zDe42J, which hides the right sidebar.
// @include       http://social.bioware.com/user_home.php*
// ==/UserScript==
(function () {
  x = document.getElementById('content_right_column').childNodes;
  if (x[3].childNodes[1].innerHTML == 'Group Subscriptions') {
    document.getElementById('sidebar').appendChild(x[3]);
  }
}());
