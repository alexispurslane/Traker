define("appkit/controllers/tickets/index", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Controller.extend({
      isSignedIn: function () {
        return eval(localStorage.isSignedIn);
      }.property(),
    });
  });