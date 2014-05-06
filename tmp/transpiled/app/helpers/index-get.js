define("appkit/helpers/index-get", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Handlebars.registerBoundHelper('index-get', function (outer, inner) {
      console.log(outer);
      return outer[inner];
    });
  });