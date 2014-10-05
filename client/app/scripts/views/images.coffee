define [
  'jquery'
  'underscore'
  'backbone'
  'templates'
  'utility'
], ($, _, Backbone, JST, util) ->
  class ImagesView extends Backbone.View
    template: JST['app/scripts/templates/images.ejs']
    imageTemplate: JST['app/scripts/templates/image.ejs']
    images: []
    sources: []
    selected: null

    tagName: 'div'

    id: 'images-container'

    className: ''

    events:
      'click .view-buttons button': 'changeView'

    initialize: () ->
      super arguments...
      console.log 'image view initialized '

    render: () ->
      console.debug 'image view rendered'
      #@$el.html @template()
      $('#no-images').hide() if (@images.length)
      @$el.html @template images: @images, sources: @sources, selected: @selected

    onNewImage: (image) ->
      console.log 'on new image', image
      util.getImageSize image.get('imageURL'), (img) =>
        unless img.width <= 5 or img.height <= 5
          @images.push image
          @sources.push image.get('src') unless image.get('src') in @sources
          @render()

    changeView: (e) ->
      console.debug 'selecting ', $(e.currentTarget).data 'source'
      @selected = $(e.currentTarget).data 'source'
      @render()
