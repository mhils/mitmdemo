(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['underscore', 'backbone'], function(_, Backbone) {
    'use strict';
    var Flow;
    return Flow = (function(_super) {
      __extends(Flow, _super);

      function Flow() {
        return Flow.__super__.constructor.apply(this, arguments);
      }

      Flow.prototype.url = '';

      Flow.prototype.initialize = function() {};

      Flow.prototype.defaults = {};

      Flow.prototype.validate = function(attrs, options) {};

      Flow.prototype.parse = function(response, options) {
        return response;
      };

      return Flow;

    })(Backbone.Model);
  });

}).call(this);
