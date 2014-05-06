define("appkit/adapters/application", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = DS.FixtureAdapter.extend();
  });
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
define("appkit/components/pretty-color", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Component.extend({
      classNames: ['pretty-color'],
      attributeBindings: ['style'],
      style: function(){
        return 'color: ' + this.get('name') + ';';
      }.property('name')
    });
  });
define("appkit/components/template-less", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Component.extend({
      classNames: ['look-ma-no-template'],
      tagName: ['span']
    });
  });
define("appkit/controllers/application", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.ArrayController.extend({
    });
  });
define("appkit/helpers/index-get", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Handlebars.registerBoundHelper('index-get', function (outer, inner) {
      console.log(outer);
      return outer[inner];
    });
  });
define("appkit/initializers/inject-store-into-component", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = {
      name: "injectStoreIntoComponent",
      after: "store",

      initialize: function(container, application) {
        container.typeInjection('component', 'store', 'store:main');
      }
    };
  });
define("appkit/lib/ticket-proxy", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.ArrayProxy.extend({
      ref: null,
      loadContent: function () {
        var that = this;
        this.ref.on('value', function (snapshot) {
          var tickets = _.map(snapshot.val(), function (value, key) {
            value.id = key;
            return value;
          });
          that.set('content', tickets);
        });
      }.observes('ref'),
      pushTicket: function (ticket) {
        this.ref.push(ticket);
      }
    });
  });
define("appkit/lib/user-proxy", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.ArrayProxy.extend({
      ref: null,
      loadContent: function () {
        var that = this;
        this.ref.on('value', function (snapshot) {
          var users = _.map(snapshot.val(), function (value, key) {
            value.id = key;
            return value;
          });
          that.set('content', users);
        });
      }.observes('ref'),
      pushTicket: function (user) {
        this.ref.push(user);
      }
    });
  });
define("appkit/models/ticket", 
  ["exports"],
  function(__exports__) {
    "use strict";
    var Ticket = DS.Model.extend({
      subject: DS.attr(),
      body: DS.attr(),
      urgency: DS.attr()
    });
    Ticket.FIXTURES = [
      { id: 1,
        subject: 'ONE!',
        body: 'ONEONEONEONEOENEINEOEMNEOEENEOENEOENEOENEOENEOEENEEOMEEOEMEOEEMEOEMEONEOEMEN!!!!!!!!!!!!'
      }
    ];
    __exports__["default"] = Ticket;
  });
define("appkit/router", 
  ["exports"],
  function(__exports__) {
    "use strict";
    var Router = Ember.Router.extend(); // ensure we don't share routes between all Router instances

    Router.map(function() {
      this.route('component-test');
      this.route('helper-test');
      this.resource('users', function() {
        this.route('new');
      });
      //this.resource('user', { path: '/user/:user_id' });
    });

    __exports__["default"] = Router;
  });
define("appkit/routes/component-test", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Route.extend({
      model: function() {
        return ['purple', 'green', 'orange'];
      }
    });
  });
define("appkit/routes/helper-test", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Route.extend({
      model: function() {
        return {
          name: "rebmE"
        };
      }
    });
  });
define("appkit/routes/index", 
  ["appkit/lib/ticket-proxy","appkit/lib/user-proxy","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    var TicketProxy = __dependency1__["default"];
    var UserProxy = __dependency2__["default"];
    __exports__["default"] = Ember.Route.extend({
      model: function() {
        var tickets = TicketProxy.create({});
        tickets.set('ref', new Firebase('https://traker.firebaseio.com/tickets'));
        var users = UserProxy.create({});
        users.set('ref', new Firebase('https://traker.firebaseio.com/users'));
        return { 
          tickets: tickets,
          users: users
        };
      }
    });
  });
define("appkit/routes/users", 
  ["appkit/lib/user-proxy","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var UserProxy = __dependency1__["default"];
    __exports__["default"] = Ember.Route.extend({
      model: function() {
        var users = UserProxy.create({});
        users.set('ref', new Firebase('http://traker.firebaseio.com/users'));
        return users;
      }
    });
  });
define("appkit/utils/ajax", 
  ["exports"],
  function(__exports__) {
    "use strict";
    /* global ic */
    __exports__["default"] = function ajax(){
      return ic.ajax.apply(null, arguments);
    }
  });
//# sourceMappingURL=app.js.map