define [
  'jquery'
  'underscore'
  'backbone'
  'templates'
  'models/image'
  'models/connection'
], ($, _, Backbone, JST, Image, Connection) ->
  class MainView extends Backbone.View
    template: JST['app/scripts/templates/main.ejs']

    socket: null

    tagName: 'div'

    id: 'main-view'

    className: ''

    events: {}

    initialize: () ->
      @setupSocketListening()

    render: () ->
        @$el.html @template()

    setupSocketListening: ->
      @socket = new WebSocket("ws://127.0.0.1:8085/events")
      @socket.onmessage = (e) =>
        obj = JSON.parse e.data
        console.log obj
        if obj.type is 'history'
          for obj in obj.data
            @handleStuff obj
        else
          @handleStuff obj

    handleStuff: (obj) ->
      switch obj.type
        when 'image'
          console.log obj.data
          image = new Image obj.data
          image.set 'imageURL', 'http://localhost:8085' + image.get 'imageURL'
          @trigger 'new:image', image
        when 'connection'
          connection = new Connection obj.data
          @trigger 'new:connection', connection
