define [
  'underscore'
  'backbone'
  'models/History-model'
], (_, Backbone, HistoryModel) ->

  class HistoryCollection extends Backbone.Collection
    model: HistoryModel