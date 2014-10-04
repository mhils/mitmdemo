define [
  'backbone', 'views/images', 'views/connections', 'views/main'
], (Backbone, ImageView, ConnectionsView, MainView) ->
  class MainRouter extends Backbone.Router
    imagesView: null
    connectionsView: null

    routes:
      'images': 'images'
      'connections': 'connections'
      '': 'main'
    currentView: null

    images: ->
      console.debug 'routed to images'
      @connectionsView.$el.hide()
      @imagesView.$el.show()

    connections: ->
      console.debug 'routed to connections'
      @imagesView.$el.hide()
      @connectionsView.$el.show()

    main: ->
      console.debug 'main view'
      @mainView.render()

    initialize: ->
      super arguments...
      console.log 'router initialized'
      @mainView = new MainView
      @imagesView = new ImageView el: $('#images-container')
      @connectionsView = new ConnectionsView

      @mainView.on 'new:image', (image) =>
        @imagesView.onNewImage image
      @connectionsView.on 'new:connection', (connection) =>
        @connectionsView.onNewConnection connection
