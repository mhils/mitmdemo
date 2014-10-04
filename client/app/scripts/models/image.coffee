define [
  'underscore'
  'backbone'
], (_, Backbone) ->
  'use strict';

  class ImageModel extends Backbone.Model
    url: ''
    imageURL: null
    src: null
    dst: null

    initialize: () ->

    defaults: {}

    validate: (attrs, options) ->

    parse: (response, options) ->
      response
