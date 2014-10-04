#/*global require*/
'use strict'

require.config
  shim: {
    bootstrap:
      deps: ['jquery'],
      exports: 'jquery'
  }
  paths:
    jquery: '../bower_components/jquery/dist/jquery'
    backbone: '../bower_components/backbone/backbone'
    underscore: '../bower_components/lodash/dist/lodash'
    bootstrap: '../bower_components/sass-bootstrap/dist/js/bootstrap'
    springy: '../bower_components/springy/springy'
    springyui: '../bower_components/springy/springyui'
    utility: 'utility'
    bootstraptabs: '../bower_components/bootstrap/js/tab'

require [
  'backbone', 'routes/main'
], (Backbone, Router) ->
  ###

  router.on 'route:images', ->
    console.log 'routed to images'
    console.log ImagesView
  ###
  router = new Router
  Backbone.history.start()

