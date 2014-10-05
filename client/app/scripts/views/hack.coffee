define [
  'jquery'
  'underscore'
  'backbone'
  'templates'
  'bootstraptabs'
], ($, _, Backbone, JST) ->
  class HackView extends Backbone.View
    template: JST['app/scripts/templates/hack.ejs']
    renderedOnce: false
    rickToggled: false

    tagName: 'div'

    id: ''

    className: ''

    events:
      'click #rick-button': 'toggleRick'
      'click #submit-file': 'submitFile'

    initialize: () ->


    render: () ->
      $('#hack-button').addClass 'active'
      @$el.html @template toggled: @rickToggled
      unless @renderedOnce
        $ ->
          $('#hack-tab a').click (e) ->
            e.preventDefault()
            $(@).tab('show')
        @renderedOnce = true
      $('#picture-tab').addClass 'active'

    toggleRick: =>
      $('#rick-button').attr 'disabled', true
      $('#great-success').addClass 'hidden'
      $.post '/rick',
        {toggle: not @rickToggled},
        (data) =>
          console.debug 'all is well'
          $('#rick-button').removeAttr 'disabled'
          $('#great-success').removeClass 'hidden'
          @rickToggled = not @rickToggled
          @render()

    submitFile: =>
      $('#submit-file').attr 'disabled', true
      $('#great-success-file').addClass 'hidden'
      file = $('#file-upload').get()[0].files[0]
      formData = new FormData()
      formData.append(file.name, file);
      xhr = new XMLHttpRequest()
      xhr.open('POST', "/file", true)
      xhr.onload = (e) =>
        console.debug 'all is well'
        $('#submit-file').removeAttr 'disabled'
        $('#great-success-file').removeClass 'hidden'
        @render()
      xhr.send(formData)
