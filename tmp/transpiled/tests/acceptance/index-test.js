define("appkit/tests/acceptance/index-test", 
  [],
  function() {
    "use strict";
    var App;

    module('Acceptances - Index', {
      setup: function(){
        App = startApp();
      },
      teardown: function() {
        Ember.run(App, 'destroy');
      }
    });
  });