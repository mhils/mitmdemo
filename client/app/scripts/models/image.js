(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['underscore', 'backbone'], function(_, Backbone) {
    'use strict';
    var ImageModel;
    return ImageModel = (function(_super) {
      __extends(ImageModel, _super);

      function ImageModel() {
        return ImageModel.__super__.constructor.apply(this, arguments);
      }

      ImageModel.prototype.url = '';

      ImageModel.prototype.imageURL = null;

      ImageModel.prototype.src = null;

      ImageModel.prototype.dst = null;

      ImageModel.prototype.initialize = function() {};

      ImageModel.prototype.defaults = {};

      ImageModel.prototype.validate = function(attrs, options) {};

      ImageModel.prototype.parse = function(response, options) {
        return response;
      };

      return ImageModel;

    })(Backbone.Model);
  });

}).call(this);
