define("appkit/app", 
  ["ember/resolver","ember/load-initializers","appkit/helpers/index-get","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __exports__) {
    "use strict";
    var Resolver = __dependency1__["default"];
    var loadInitializers = __dependency2__["default"];
    var indexGet = __dependency3__["default"];
    var App = Ember.Application.extend({
      modulePrefix: 'appkit', // TODO: loaded via config
      Resolver: Resolver,
       LOG_ACTIVE_GENERATION: true
    });
    loadInitializers(App, 'appkit');

    __exports__["default"] = App;
  });