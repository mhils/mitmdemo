define(function(){

this["JST"] = this["JST"] || {};

this["JST"]["app/scripts/templates/connections.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '\n';

}
return __p
};

this["JST"]["app/scripts/templates/hack.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<ul id="hack-tab" class="nav nav-tabs" role="tablist">\n    <li class="active"><a href="#picture-tab" role="tab" data-toggle="tab">Pictures</a></li>\n    <li class=""><a href="#rick-tab" role="tab" data-toggle="tab">Rickroll</a></li>\n</ul>\n\n<div id="hack-tab-content" class="tab-content">\n    <div class="tab-pane" id="picture-tab">\n        <div class="jumbotron">\n            <p>Let\'s replace ALL of the images going through the network with one of ours! How devious.</p>\n\n            <form method="post" action="http://127.0.0.1:8085/file" enctype=multipart/form-data>\n                <input type="file" id="file-upload" name="file"/>\n                <input type="submit" class="btn btn-default" />\n            </form>\n        </div>\n    </div>\n    <div id="rick-tab" class="tab-pane">\n        <div class="jumbotron">\n            <button type="button" class="btn btn-default" id="rick-button">\n                ';
 if (toggled) {;
__p += '\n                    Toggle off\n                ';
 } else {;
__p += '\n                    Toggle on\n                ';
 };
__p += '\n            </button>\n            <div id="great-success" class="hidden">Great stuff!</div>\n        </div>\n    </div>\n</div>\n';

}
return __p
};

this["JST"]["app/scripts/templates/image.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="panel panel-default">\n    <div class="image-meta panel-heading">\n        <span class="image-src-container">From: <span class="image-src">' +
((__t = ( image.get('src') )) == null ? '' : __t) +
'</span></span>\n        <span class="image-dst-container pull-right">Server: <span class="image-dst">' +
((__t = ( image.get('dst') )) == null ? '' : __t) +
'</span></span>\n    </div>\n    <div class="image-container panel-body">\n        <img src="' +
((__t = ( image.get('imageURL') )) == null ? '' : __t) +
'" class="image img-rounded" />\n    </div>\n</div>\n<hr />\n';

}
return __p
};

this["JST"]["app/scripts/templates/images.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {

 if (!images.length) {;
__p += '\n<div class="jumbotron" id="no-images">\n    <h2>Let\'s snoop some images!</h2>\n    <p>C\'mon c\'mon...</p>\n</div>\n';
 } else { ;
__p += '\n    <div class="view-buttons">\n        <button type="button" class="btn btn-default">Default</button>\n        ';
 for (var i = 0; i < sources.length; i++) { var source = sources[i]; ;
__p += '\n        <button type="button" class="btn btn-default" data-source="' +
((__t = ( source)) == null ? '' : __t) +
'">' +
((__t = ( source)) == null ? '' : __t) +
'</button>\n        ';
};
__p += '\n    </div>\n    ';
 if (!selected) {;
__p += '\n        ';
 for (var i=images.length - 1; i >= 0; i--) { var image = images[i]; ;
__p += '\n            <div class="panel panel-default">\n                <div class="image-meta panel-heading">\n                    <span class="image-src-container">From: <span class="image-src">' +
((__t = ( image.get('src') )) == null ? '' : __t) +
'</span></span>\n                    <span class="image-dst-container pull-right">Server: <span class="image-dst">' +
((__t = ( image.get('dst') )) == null ? '' : __t) +
'</span></span>\n                </div>\n                <div class="image-container panel-body">\n                    <img src="' +
((__t = ( image.get('imageURL') )) == null ? '' : __t) +
'" class="image img-rounded" />\n                </div>\n            </div>\n        ';
 } ;
__p += '\n    ';
 } else { ;
__p += '\n        <div class="panel panel-default">\n            <div class="panel-heading">\n                From <span class="image-src">' +
((__t = ( selected )) == null ? '' : __t) +
'</span>\n            </div>\n            <div class="panel-body">\n                ';
 for (var i=0; i < images.length; i++) { var image = images[i]; ;
__p += '\n                    <img src="' +
((__t = ( image.get('imageURL') )) == null ? '' : __t) +
'" class="image img-rounded image-grouped" />\n                ';
 } ;
__p += '\n            </div>\n        </div>\n    ';
 } ;
__p += '\n';
 } ;
__p += '\n';

}
return __p
};

this["JST"]["app/scripts/templates/main.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<p>Your content here.</p>\n\n';

}
return __p
};

  return this["JST"];

});