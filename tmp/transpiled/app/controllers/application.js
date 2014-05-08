define("appkit/controllers/application", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Controller.extend({
      isSignedIn: function () {
        return eval(localStorage.isSignedIn);
      }.property(),
      actions: {
        logout: function () {
          localStorage.isSignedIn = false;
          this.set('isSignedIn', false);
          this.transitionTo('sighnin');
        }
      }
    });
  });