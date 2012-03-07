# BioWare Social Network user style and script

A style/script set for prettying up the [BioWare Social Network][BSN] user home page, mainly intended for themes.

The stylesheet hides several space wasters completely inconsequential to the average user, such as the (seldomly updated) carousel that takes up a good chunk of the home page. The content's background is made transparent to reveal more of the theme wallpaper. Other cosmetic changes improve general usability.

The script primarily seeks to address the shortcomings of CSS on a clumsily coded site, such as moving important parts of the right sidebar, like subscription notifications, to the left. It adds no extra functionality.

## Support

Officially, only the latest stable version of Firefox is supported. Other browsers have less developed (or no) alternatives to Firefox' addons for user files. The `linear-gradient` property is supported by all major browsers as of IE10 but only in vendor specific format. For other browsers, change `moz` to one of `webkit`, `o`, or `ms`.

### Dependencies

* [Stylish][] 1.2.6+
* [Greasemonkey][] 0.9.18+

[BSN]: http://social.bioware.com/
[Stylish]: https://addons.mozilla.org/da/firefox/addon/stylish/
[Greasemonkey]: https://addons.mozilla.org/da/firefox/addon/greasemonkey/