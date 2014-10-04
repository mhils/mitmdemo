define [
  'jquery'
  'underscore'
  'backbone'
  'templates'
  'springy'
  'springyui'
], ($, _, Backbone, JST) ->
  class ConnectionsView extends Backbone.View
    template: JST['app/scripts/templates/connections.ejs']
    connections: null

    nodes: []
    edges: []

    tagName: 'div'

    id: 'connections-container'

    className: ''

    events: {}

    initialize: () ->
      #@listenTo @model, 'change', @render
      @setupSpringy()

    render: () ->
        #@$el.html @template(@model.toJSON())
        $('#connections-button').addClass 'active'

    setupSpringy: ->
      console.debug 'setting up springy'
      @graph = new Springy.Graph()
      window.graph = @graph
      $ =>
        springy = $('#springy-canvas').springy
          graph: @graph

    onNewConnection: (connection) ->
      src = connection.get 'src'
      dst = connection.get 'dst'
      unless src in @nodes
        @graph.addNodes(src)
        @nodes.push src
      unless dst in @nodes
        @graph.addNodes(dst)
        @nodes.push dst
      if _.findIndex(@edges, (edge) -> (edge[0] is src) and (edge[1] is dst)) is -1
        @graph.addEdges([src, dst])
        @edges.push [src, dst]
