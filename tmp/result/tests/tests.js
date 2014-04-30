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
define("appkit/tests/helpers/resolver", 
  ["ember/resolver","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Resolver = __dependency1__["default"];

    var resolver = Resolver.create();

    resolver.namespace = {
      modulePrefix: 'appkit'
    };

    __exports__["default"] = resolver;
  });
define("appkit/tests/helpers/start-app", 
  ["appkit/app","appkit/router","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    var Application = __dependency1__["default"];
    var Router = __dependency2__["default"];

    function startApp(attrs) {
      var App;

      var attributes = Ember.merge({
        // useful Test defaults
        rootElement: '#ember-testing',
        LOG_ACTIVE_GENERATION:false,
        LOG_VIEW_LOOKUPS: false
      }, attrs); // but you can override;

      Router.reopen({
        location: 'none'
      });

      Ember.run(function(){
        App = Application.create(attributes);
        App.setupForTesting();
        App.injectTestHelpers();
      });

      App.reset(); // this shouldn't be needed, i want to be able to "start an app at a specific URL"

      return App;
    }

    __exports__["default"] = startApp;
  });
define("appkit/tests/unit/routes/index-test", 
  ["ember-qunit","appkit/routes/index","appkit/models/ticket"],
  function(__dependency1__, __dependency2__, __dependency3__) {
    "use strict";
    var test = __dependency1__.test;
    var moduleFor = __dependency1__.moduleFor;


    var Index = __dependency2__["default"];
    var Ticket = __dependency3__["default"];
    moduleFor('route:index', "Unit - IndexRoute");

    test("it exists", function(){
      ok(this.subject() instanceof Index);
    });
    test("it returns the ticket FIXTURES", function(){
      equal(this.subject().model(), Ticket.FIXTURES);
    });
  });
//# sourceMappingURL=tests.js.map