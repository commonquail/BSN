# BioWare Forum Readability Fix

A style/script set for prettying up the [BioWare Social Network][BSN], mainly intended for themes.

The stylesheet hides several space wasters completely inconsequential to the average user, such as the (seldomly updated) carousel that takes up a good chunk of the home page. The content's background is made transparent to reveal more of the theme wallpaper. The forum has vastly improved space utilization. Other cosmetic changes improve general usability.

The script addresses a few corner case functionality issues, such as the retarded forum search and the clumsy group discussion interface, and additionally adds the ability to save trimmed down PMs locally.

### Last update
2012-11-26

## Installation

It is recommended to install the files from their [userstyles.org][CSS] respectively [userscripts.org][JS] pages to better facilitate updating.

## Support

Officially, only the latest stable version of Firefox is supported. Versions of Firefox older than 14 are not fully supported. Other browsers have less developed (or no) alternatives to Firefox' addons for user files. The `linear-gradient` property is supported by all major browsers as of IE10 but only in vendor specific format. For other browsers, change `moz` to one of `webkit`, `o`, or `ms`.

As of 1.8.0 the script requires the third party library [FileSaver.js][FileSaver], since Firefox as of version 16 doesn't have native support for the FileSaver API. This has certain implications:

* Greasemonkey will automatically fetch and store (for caching) the library, but only when a dependent script is installed. This means an automatic update will not suffice. It is necessary to (re-)install the script manually (it is enough to click the install button).
* If a direct download is initiated the lack of native support means a file name cannot be specified. The `<a>.download` attribute addresses this but so far is only supported by Chrome. However, upon saving a Web page Firefox will suggest the page title for the file name. Consequently, rather than trigger a download the script opens a new window with data that must then be saved as a Web page via the context menu or Ctrl+S.

### Dependencies

* [Stylish][] 1.4.1+

[BSN]: http://forum.bioware.com/
[JS]: http://userscripts.org/scripts/show/127615
[CSS]: http://userstyles.org/styles/98563/the-bioware-forum
[Stylish]: https://addons.mozilla.org/firefox/addon/stylish/
[Greasemonkey]: https://addons.mozilla.org/da/firefox/addon/greasemonkey/