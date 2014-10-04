define [
  'underscore'
  'backbone'
], (_, Backbone) ->
  'use strict';

  class ImageModel extends Backbone.Model
    url: ''
    imageURL: null

    initialize: (imageURL) ->
      @set 'imageURL', imageURL

    defaults: {}

    validate: (attrs, options) ->

    parse: (response, options) ->
      response
