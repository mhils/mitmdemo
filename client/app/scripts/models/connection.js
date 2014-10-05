(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['underscore', 'backbone'], function(_, Backbone) {
    'use strict';
    var ConnectionModel;
    return ConnectionModel = (function(_super) {
      __extends(ConnectionModel, _super);

      function ConnectionModel() {
        return ConnectionModel.__super__.constructor.apply(this, arguments);
      }

      ConnectionModel.prototype.url = '';

      ConnectionModel.prototype.initialize = function() {};

      ConnectionModel.prototype.defaults = {};

      ConnectionModel.prototype.validate = function(attrs, options) {};

      ConnectionModel.prototype.parse = function(response, options) {
        return response;
      };

      return ConnectionModel;

    })(Backbone.Model);
  });

}).call(this);
