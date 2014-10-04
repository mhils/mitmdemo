define [
  'jquery'
  'underscore'
  'backbone'
  'templates'
], ($, _, Backbone, JST) ->
  class ImagesView extends Backbone.View
    template: JST['app/scripts/templates/images.ejs']
    imageTemplate: JST['app/scripts/templates/image.ejs']

    tagName: 'div'

    id: 'images-container'

    className: ''

    events: {}


    initialize: () ->
      super arguments...
      console.log 'image view initialized '
      @render()

    render: () ->
      console.debug 'image view rendered'
      @$el.html @template()

    onNewImage: (image) ->
      console.debug 'on new image'
      @$el.append @imageTemplate image: image
