// ==UserScript==
// @name          BioWare Social Network: Home
// @namespace     quail
// @version       1.3.1
// @updateURL     http://userscripts.org/scripts/source/127615.user.js
// @description   Companion script for user style http://bit.ly/zDe42J. Further
//                details on script page.
// @include       http://social.bioware.com/user_home.php*
// @include       http://social.bioware.com/forum*
// ==/UserScript==
(function () {
  if (document.URL.indexOf('user_home.php') >= 0) {
    x = document.getElementById('content_right_column').childNodes;
    if (x[3].childNodes[1].innerHTML == 'Group Subscriptions') {
      document.getElementById('sidebar').appendChild(x[3]);
    }
  } else if (document.URL.indexOf('forum') >= 0) {
    document.forms[1].innerHTML = '<form action="http://www.google.com/search" method="get"><div class="searchwrapper"><input type="hidden" value="social.bioware.com" name="sitesearch"><input type="text" value="" name="q" style="width:300px" class="search"><input type="submit" value="Google Search" ></div></form>';
  }
}());
