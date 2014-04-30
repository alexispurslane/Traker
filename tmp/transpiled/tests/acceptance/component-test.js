define("appkit/tests/acceptance/component-test", 
  [],
  function() {
    "use strict";
    var App;

    module('Acceptances - Component', {
      setup: function(){
        App = startApp();
      },
      teardown: function() {
        Ember.run(App, 'destroy');
      }
    });
  });