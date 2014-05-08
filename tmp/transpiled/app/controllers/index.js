define("appkit/controllers/index", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Controller.extend({
      isSignedIn: function () {
        return App.__container__.lookup('controller:application').get('isSignedIn');
      }.property(),

    });
  });