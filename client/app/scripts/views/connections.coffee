define [
  'jquery'
  'underscore'
  'backbone'
  'templates'
], ($, _, Backbone, JST) ->
  class ConnectionsView extends Backbone.View
    template: JST['app/scripts/templates/connections.ejs']
    connections: null

    tagName: 'div'

    id: 'connections-container'

    className: ''

    events: {}

    initialize: () ->
        #@listenTo @model, 'change', @render
        @render()

    render: () ->
        #@$el.html @template(@model.toJSON())

    onNewConnection: (connection) ->
      console.debug 'on new connection', connection
