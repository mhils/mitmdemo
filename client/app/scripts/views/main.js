(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['jquery', 'underscore', 'backbone', 'templates', 'models/image', 'models/connection'], function($, _, Backbone, JST, Image, Connection) {
    var MainView;
    return MainView = (function(_super) {
      __extends(MainView, _super);

      function MainView() {
        return MainView.__super__.constructor.apply(this, arguments);
      }

      MainView.prototype.template = JST['app/scripts/templates/main.ejs'];

      MainView.prototype.socket = null;

      MainView.prototype.tagName = 'div';

      MainView.prototype.id = 'main-container';

      MainView.prototype.className = '';

      MainView.prototype.events = {};

      MainView.prototype.initialize = function() {
        return this.setupSocketListening();
      };

      MainView.prototype.render = function() {
        return this.$el.html(this.template());
      };

      MainView.prototype.setupSocketListening = function() {
        this.socket = new WebSocket("ws://127.0.0.1:8085/events");
        return this.socket.onmessage = (function(_this) {
          return function(e) {
            var obj, _i, _len, _ref, _results;
            obj = JSON.parse(e.data);
            console.log(obj);
            if (obj.type === 'history') {
              _ref = obj.data;
              _results = [];
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                obj = _ref[_i];
                _results.push(_this.handleStuff(obj));
              }
              return _results;
            } else {
              return _this.handleStuff(obj);
            }
          };
        })(this);
      };

      MainView.prototype.handleStuff = function(obj) {
        var connection, image;
        switch (obj.type) {
          case 'image':
            console.log(obj.data);
            image = new Image(obj.data);
            image.set('imageURL', 'http://localhost:8085' + image.get('imageURL'));
            return this.trigger('new:image', image);
          case 'connection':
            connection = new Connection(obj.data);
            return this.trigger('new:connection', connection);
        }
      };

      return MainView;

    })(Backbone.View);
  });

}).call(this);
