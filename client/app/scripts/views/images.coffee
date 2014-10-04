define [
  'jquery'
  'underscore'
  'backbone'
  'templates'
], ($, _, Backbone, JST) ->
  class ImagesView extends Backbone.View
    template: JST['app/scripts/templates/images.ejs']

    tagName: 'div'

    id: ''

    className: ''

    events: {}

    initialize: () ->
        @listenTo @model, 'change', @render

    render: () ->
        @$el.html @template(@model.toJSON())
