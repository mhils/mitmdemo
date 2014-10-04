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
      @resetMenu()
      console.debug 'routed to images'
      console.log @connectionsView.$el
      @connectionsView.$el.hide()
      @imagesView.$el.show()
      @imagesView.render()

    connections: ->
      @resetMenu()
      console.debug 'routed to connections'
      @imagesView.$el.hide()
      @connectionsView.$el.show()
      @connectionsView.render()

    main: ->
      @resetMenu()
      console.debug 'main view'
      @imagesView.$el.hide()
      @connectionsView.$el.show()
      @mainView.render()

    initialize: ->
      super arguments...
      console.log 'router initialized'
      @mainView = new MainView
      @imagesView = new ImageView el: $('#images-container')
      @connectionsView = new ConnectionsView el: $ '#connections-container'

      @mainView.on 'new:image', (image) =>
        @imagesView.onNewImage image
      @mainView.on 'new:connection', (connection) =>
        @connectionsView.onNewConnection connection

    resetMenu: ->
      $('.active').removeClass('active')
