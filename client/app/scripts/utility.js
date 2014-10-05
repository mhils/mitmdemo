(function() {
  define([], function() {
    return {
      getImageSize: function(url, callback) {
        return $("<img/>").attr("src", url).load(function() {
          return callback(this);
        });
      }
    };
  });

}).call(this);
