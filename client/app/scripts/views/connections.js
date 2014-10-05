(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define(['jquery', 'underscore', 'backbone', 'templates', 'springy', 'springyui'], function($, _, Backbone, JST) {
    var ConnectionsView;
    return ConnectionsView = (function(_super) {
      __extends(ConnectionsView, _super);

      function ConnectionsView() {
        return ConnectionsView.__super__.constructor.apply(this, arguments);
      }

      ConnectionsView.prototype.template = JST['app/scripts/templates/connections.ejs'];

      ConnectionsView.prototype.connections = null;

      ConnectionsView.prototype.nodes = [];

      ConnectionsView.prototype.edges = [];

      ConnectionsView.prototype.tagName = 'div';

      ConnectionsView.prototype.id = 'connections-container';

      ConnectionsView.prototype.className = '';

      ConnectionsView.prototype.events = {};

      ConnectionsView.prototype.initialize = function() {
        return this.setupSpringy();
      };

      ConnectionsView.prototype.render = function() {
        return $('#connections-button').addClass('active');
      };

      ConnectionsView.prototype.setupSpringy = function() {
        console.debug('setting up springy');
        this.graph = new Springy.Graph();
        window.graph = this.graph;
        return $((function(_this) {
          return function() {
            var springy;
            return springy = $('#springy-canvas').springy({
              graph: _this.graph
            });
          };
        })(this));
      };

      ConnectionsView.prototype.onNewConnection = function(connection) {
        var dst, src;
        src = connection.get('src');
        dst = connection.get('dst');
        if (__indexOf.call(this.nodes, src) < 0) {
          this.graph.addNodes(src);
          this.nodes.push(src);
        }
        if (__indexOf.call(this.nodes, dst) < 0) {
          this.graph.addNodes(dst);
          this.nodes.push(dst);
        }
        if (_.findIndex(this.edges, function(edge) {
          return (edge[0] === src) && (edge[1] === dst);
        }) === -1) {
          this.graph.addEdges([src, dst]);
          return this.edges.push([src, dst]);
        }
      };

      return ConnectionsView;

    })(Backbone.View);
  });

}).call(this);
