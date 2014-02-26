// ==UserScript==
// @name          BioWare Forum
// @namespace     quail
// @version       1.0.0
// @updateURL     http://userscripts.org/scripts/source/399583.user.js
// @grant         none
// @description   Usability improvements for the BioWare forum.
// @include       http://forum.bioware.com/*
// ==/UserScript==
(function () {
  // Display link to friends' status update in global navigation bar.
  var li = document.createElement("li");
  li.id = "nav_app_friendstatus";
  li.className =  "left";
  if (location.pathname.startsWith("/statuses/friends")) {
      li.className += " active";
  }
  var a = document.createElement('a');
  a.href = "//" + location.host + "/statuses/friends/";
  a.title = "Go to friends' status updates";
  a.textContent = "Friends";
  li.appendChild(a);
  var ul = document.getElementById("community_app_menu");
  ul.insertBefore(li, ul.children[ul.children.length - 1]);
}());