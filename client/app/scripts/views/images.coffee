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

    tagName: 'div'

    id: 'images-container'

    className: ''

    events: {}

    initialize: () ->
      super arguments...
      console.log 'image view initialized '

    render: () ->
      console.debug 'image view rendered'
      #@$el.html @template()
      $('#images-button').addClass 'active'

    onNewImage: (image) ->
      console.log 'on new image', image
      util.getImageSize image.get('imageURL'), (img) =>
        unless img.width <= 5 or img.height <= 5
          $('#no-images').hide()
          @$el.append @imageTemplate image: image
