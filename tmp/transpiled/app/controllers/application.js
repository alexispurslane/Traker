define("appkit/controllers/application", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Controller.extend({
      isSignedIn: function () {
        if (localStorage.isSignedIn != undefined) {
          return localStorage.isSignedIn;
        } else {
          return false;
        }
      }.property(),
      actions: {
        logout: function () {
          localStorage.isSignedIn = false;
          this.transitionTo('sighnin');
        }
      }
    });
  });