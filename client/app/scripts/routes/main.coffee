define [
  'backbone', 'views/images', 'views/connections', 'views/main', 'views/hack'
], (Backbone, ImageView, ConnectionsView, MainView, HackView) ->
  class MainRouter extends Backbone.Router
    imagesView: null
    connectionsView: null
    active: null

    routes:
      'images': 'images'
      'connections': 'connections'
      'hack': 'hack'
      '': 'main'
    currentView: null

    images: ->
      @resetMenu()
      console.debug 'routed to images'
      @connectionsView.$el.hide()
      @hackView.$el.hide()
      @mainView.$el.hide()
      @imagesView.$el.show()
      @imagesView.render()
      $('#images-button').addClass 'active'
      @active = @imagesView

    connections: ->
      @resetMenu()
      console.debug 'routed to connections'
      @imagesView.$el.hide()
      @hackView.$el.hide()
      @mainView.$el.hide()
      @connectionsView.$el.show()
      @connectionsView.render()
      @active = @connectionsView

    hack: ->
      @resetMenu()
      console.debug 'routed to hack'
      @imagesView.$el.hide()
      @connectionsView.$el.hide()
      @mainView.$el.hide()
      @hackView.$el.show()
      @hackView.render()
      @active = @hackView

    main: ->
      @resetMenu()
      console.debug 'main view'
      @imagesView.$el.hide()
      @connectionsView.$el.hide()
      @hackView.$el.hide()
      @mainView.$el.show()
      @mainView.render()
      @active = @mainView

    initialize: ->
      super arguments...
      console.log 'router initialized'
      @mainView = new MainView el: $ '#main-container'
      @imagesView = new ImageView el: $('#images-container')
      @connectionsView = new ConnectionsView el: $ '#connections-container'
      @hackView = new HackView el: $ '#hack-container'

      @mainView.on 'new:image', (image) =>
        @imagesView.onNewImage image
      @mainView.on 'new:connection', (connection) =>
        @connectionsView.onNewConnection connection

    resetMenu: ->
      $('.active').removeClass('active')
