(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'views/images', 'views/connections', 'views/main', 'views/hack'], function(Backbone, ImageView, ConnectionsView, MainView, HackView) {
    var MainRouter;
    return MainRouter = (function(_super) {
      __extends(MainRouter, _super);

      function MainRouter() {
        return MainRouter.__super__.constructor.apply(this, arguments);
      }

      MainRouter.prototype.imagesView = null;

      MainRouter.prototype.connectionsView = null;

      MainRouter.prototype.active = null;

      MainRouter.prototype.routes = {
        'images': 'images',
        'connections': 'connections',
        'hack': 'hack',
        '': 'main'
      };

      MainRouter.prototype.currentView = null;

      MainRouter.prototype.images = function() {
        this.resetMenu();
        console.debug('routed to images');
        this.connectionsView.$el.hide();
        this.hackView.$el.hide();
        this.mainView.$el.hide();
        this.imagesView.$el.show();
        this.imagesView.render();
        return this.active = this.imagesView;
      };

      MainRouter.prototype.connections = function() {
        this.resetMenu();
        console.debug('routed to connections');
        this.imagesView.$el.hide();
        this.hackView.$el.hide();
        this.mainView.$el.hide();
        this.connectionsView.$el.show();
        this.connectionsView.render();
        return this.active = this.connectionsView;
      };

      MainRouter.prototype.hack = function() {
        this.resetMenu();
        console.debug('routed to hack');
        this.imagesView.$el.hide();
        this.connectionsView.$el.hide();
        this.mainView.$el.hide();
        this.hackView.$el.show();
        this.hackView.render();
        return this.active = this.hackView;
      };

      MainRouter.prototype.main = function() {
        this.resetMenu();
        console.debug('main view');
        this.imagesView.$el.hide();
        this.connectionsView.$el.hide();
        this.hackView.$el.hide();
        this.mainView.$el.show();
        this.mainView.render();
        return this.active = this.mainView;
      };

      MainRouter.prototype.initialize = function() {
        MainRouter.__super__.initialize.apply(this, arguments);
        console.log('router initialized');
        this.mainView = new MainView({
          el: $('#main-container')
        });
        this.imagesView = new ImageView({
          el: $('#images-container')
        });
        this.connectionsView = new ConnectionsView({
          el: $('#connections-container')
        });
        this.hackView = new HackView({
          el: $('#hack-container')
        });
        this.mainView.on('new:image', (function(_this) {
          return function(image) {
            return _this.imagesView.onNewImage(image);
          };
        })(this));
        return this.mainView.on('new:connection', (function(_this) {
          return function(connection) {
            return _this.connectionsView.onNewConnection(connection);
          };
        })(this));
      };

      MainRouter.prototype.resetMenu = function() {
        return $('.active').removeClass('active');
      };

      return MainRouter;

    })(Backbone.Router);
  });

}).call(this);
