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
        switch obj.type
          when 'history'
            console.log obj.data
          when 'image'
            image = new Image 'http://localhost:8085' + obj.data
            @trigger 'new:image', image
          when 'connection'
            connection = new Connection
            @trigger 'new:connection', connection
