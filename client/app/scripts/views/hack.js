(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['jquery', 'underscore', 'backbone', 'templates', 'bootstraptabs'], function($, _, Backbone, JST) {
    var HackView;
    return HackView = (function(_super) {
      __extends(HackView, _super);

      function HackView() {
        this.submitFile = __bind(this.submitFile, this);
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
        'click #rick-button': 'toggleRick',
        'click #submit-file': 'submitFile'
      };

      HackView.prototype.initialize = function() {};

      HackView.prototype.render = function() {
        $('#hack-button').addClass('active');
        this.$el.html(this.template({
          toggled: this.rickToggled
        }));
        if (!this.renderedOnce) {
          this.renderedOnce = true;
          $(function() {
            return $('#hack-tab a').click(function(e) {
              e.preventDefault();
              return $(this).tab('show');
            });
          });
        }
        return $('#picture-tab').addClass('active');
      };

      HackView.prototype.toggleRick = function() {
        $('#rick-button').attr('disabled', true);
        $('#great-success').addClass('hidden');
        return $.post('/rick', {
          toggle: !this.rickToggled
        }, (function(_this) {
          return function(data) {
            var newText;
            console.debug('all is well');
            $('#rick-button').removeAttr('disabled');
            $('#great-success').removeClass('hidden');
            _this.rickToggled = !_this.rickToggled;
            newText = _this.rickToggled ? 'Toggle off' : 'Toggle on';
            return $('#rick-button').html(newText);
          };
        })(this));
      };

      HackView.prototype.submitFile = function() {
        var file, formData, xhr;
        $('#submit-file').attr('disabled', true);
        $('#great-success-file').addClass('hidden');
        file = $('#file-upload').get()[0].files[0];
        formData = new FormData();
        formData.append(file.name, file);
        xhr = new XMLHttpRequest();
        xhr.open('POST', "/file", true);
        xhr.onload = (function(_this) {
          return function(e) {
            console.debug('all is well');
            $('#submit-file').removeAttr('disabled');
            $('#great-success-file').removeClass('hidden');
            return _this.render();
          };
        })(this);
        return xhr.send(formData);
      };

      return HackView;

    })(Backbone.View);
  });

}).call(this);
