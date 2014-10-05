(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['jquery', 'underscore', 'backbone', 'templates', 'bootstraptabs'], function($, _, Backbone, JST) {
    var HackView;
    return HackView = (function(_super) {
      __extends(HackView, _super);

      function HackView() {
        this.toggleRick = __bind(this.toggleRick, this);
        return HackView.__super__.constructor.apply(this, arguments);
      }

      HackView.prototype.template = JST['app/scripts/templates/hack.ejs'];

      HackView.prototype.renderedOnce = false;

      HackView.prototype.rickToggled = false;

      HackView.prototype.tagName = 'div';

      HackView.prototype.id = '';

      HackView.prototype.className = '';

      HackView.prototype.events = {
        'click #rick-button': 'toggleRick'
      };

      HackView.prototype.initialize = function() {};

      HackView.prototype.render = function() {
        $('#hack-button').addClass('active');
        this.$el.html(this.template({
          toggled: this.rickToggled
        }));
        if (!this.renderedOnce) {
          $(function() {
            return $('#hack-tab a').click(function(e) {
              e.preventDefault();
              return $(this).tab('show');
            });
          });
          this.renderedOnce = true;
        }
        return $('#picture-tab').addClass('active');
      };

      HackView.prototype.toggleRick = function() {
        $('#rick-button').attr('disabled', true);
        $('#great-stuff').addClass('hidden');
        return $.post('/rick', {
          toggle: !this.rickToggled
        }, (function(_this) {
          return function(data) {
            console.debug('all is well');
            $('#rick-button').removeAttr('disabled');
            $('#great-stuff').removeClass('hidden');
            _this.rickToggled = !_this.rickToggled;
            return _this.render();
          };
        })(this));
      };

      return HackView;

    })(Backbone.View);
  });

}).call(this);
