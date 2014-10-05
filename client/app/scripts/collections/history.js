(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['underscore', 'backbone', 'models/History-model'], function(_, Backbone, HistoryModel) {
    var HistoryCollection;
    return HistoryCollection = (function(_super) {
      __extends(HistoryCollection, _super);

      function HistoryCollection() {
        return HistoryCollection.__super__.constructor.apply(this, arguments);
      }

      HistoryCollection.prototype.model = HistoryModel;

      return HistoryCollection;

    })(Backbone.Collection);
  });

}).call(this);
