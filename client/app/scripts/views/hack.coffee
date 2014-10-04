define [
  'jquery'
  'underscore'
  'backbone'
  'templates'
], ($, _, Backbone, JST) ->
  class HackView extends Backbone.View
    template: JST['app/scripts/templates/hack.ejs']

    tagName: 'div'

    id: ''

    className: ''

    events: {}

    initialize: () ->
      @$el.html @template()

    render: () ->
      $('#hack-button').addClass 'active'

