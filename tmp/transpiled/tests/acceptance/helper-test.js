define("appkit/tests/acceptance/helper-test", 
  [],
  function() {
    "use strict";
    var App;

    module("Acceptances - Helper", {
      setup: function(){
        App = startApp();
      },
      teardown: function() {
        Ember.run(App, 'destroy');
      }
    });
  });