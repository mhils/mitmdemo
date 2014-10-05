(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define(['jquery', 'underscore', 'backbone', 'templates', 'utility'], function($, _, Backbone, JST, util) {
    var ImagesView;
    return ImagesView = (function(_super) {
      __extends(ImagesView, _super);

      function ImagesView() {
        return ImagesView.__super__.constructor.apply(this, arguments);
      }

      ImagesView.prototype.template = JST['app/scripts/templates/images.ejs'];

      ImagesView.prototype.imageTemplate = JST['app/scripts/templates/image.ejs'];

      ImagesView.prototype.images = [];

      ImagesView.prototype.sources = [];

      ImagesView.prototype.selected = null;

      ImagesView.prototype.tagName = 'div';

      ImagesView.prototype.id = 'images-container';

      ImagesView.prototype.className = '';

      ImagesView.prototype.events = {
        'click .view-buttons button': 'changeView'
      };

      ImagesView.prototype.initialize = function() {
        ImagesView.__super__.initialize.apply(this, arguments);
        return console.log('image view initialized ');
      };

      ImagesView.prototype.render = function() {
        console.debug('image view rendered');
        if (this.images.length) {
          $('#no-images').hide();
        }
        $('#images-button').addClass('active');
        return this.$el.html(this.template({
          images: this.images,
          sources: this.sources,
          selected: this.selected
        }));
      };

      ImagesView.prototype.onNewImage = function(image) {
        console.log('on new image', image);
        return util.getImageSize(image.get('imageURL'), (function(_this) {
          return function(img) {
            var _ref;
            if (!(img.width <= 5 || img.height <= 5)) {
              _this.images.push(image);
              if (_ref = image.get('src'), __indexOf.call(_this.sources, _ref) < 0) {
                _this.sources.push(image.get('src'));
              }
              return _this.render();
            }
          };
        })(this));
      };

      ImagesView.prototype.changeView = function(e) {
        console.debug('selecting ', $(e.currentTarget).data('source'));
        this.selected = $(e.currentTarget).data('source');
        return this.render();
      };

      return ImagesView;

    })(Backbone.View);
  });

}).call(this);
