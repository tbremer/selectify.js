![version-0.1.2](http://img.shields.io/badge/Version-0.1.2-00cc00.svg?style=flat) ![copyleft](http://img.shields.io/badge/Copyleft- &#8602; -dd6ad5.svg?style=flat) ![download-1.901kb](http://img.shields.io/badge/Download-1.901kb-136ad5.svg?style=flat)
Selectify.js
============
A simple jQuery plugin that creates HTML5, CSS3 & Browser (down it IE8) compliant selectboxes. Crafted for a need of simple reusable development processes by [tbremer @ MISE.io](//mise.io). Feel free to download [here](https://github.com/tbremer/selectify.js/archive/master.zip), or checkout the [demo](//mise.io/selectify.js)

How to use
-----------
####HTML
```html
<select name="" id="selectify">
    <option value="simple">Simple</option>
    <option value="beautiful">Beautiful</option>
    <option value="compliant">Compliant</option>
    <option value="selectboxes">Selectboxes</option>
    <option value="selectify" selected>Selectify.js</option>
</select>
```

####jQuery
```javascript
$('#selectify').selectify();
```

Events
-----------
Selectify will trigger certain events, the same as a regular `<select>` DOM Node would. Focus, Blur, Change. You can listen on those events the same way you would on any other form element in jQuery, however they are namespaced to avoid interfering with your normal work flow, that namespace is `selectify.event`:
```javascript
$('#selectify').on('selectify.focus', [data], [function]);
```
```javascript
$('#selectify').on('selectify.blur', [data], [function]);
```
```javascript
$('#selectify').on('selectify.change', [data], [function]);
```

Suggested Styling
-----------
Included in this repo is a compiled stylesheet, and the expanded SASS version, it is mearly a suggestion, and what I like the best. Feel free to modify it, but it should look fine on all sites as is.
