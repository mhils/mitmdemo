define [], ->
  getImageSize: (url, callback) ->
    $("<img/>").attr("src", url).load -> callback this
