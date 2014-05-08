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
define("appkit/controllers/sighnin", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Controller.extend({
      needs: ['application'],
      image: function () {
        return 'http://www.gravatar.com/avatar/' + md5(this.get('email'));
      }.property('email'),
      url: function () {
        return 'mailto:' + this.get('email');
      }.property('email'),
      isSignedIn: function () {
        return localStorage.isSignedIn;
      }.property(),
      actions: {
        submit: function () {
          $('.alert-box').remove();
          var users = this.get('model.users.content');
          var userProxy = this.get('model.users');
          var object = {  
            image: this.get('image'),
            url: this.get('url'),
            name: this.get('name'),
            email: this.get('email'),
            password: this.get('password')
          };
          function arraysEqual(a,b) { return !(a<b || b<a); }
          if (object.email != undefined && object.password != undefined) {
            if (arraysEqual(_.where(users, { email:object.email }), new Array(0))) {
              userProxy.pushUser(object);
              App.__container__.lookup('controller:application').set('isSignedIn', true);
            } else {
              var match = _.where(users, { email:object.email });
              if (match[0].password != object.password) {
                $('.password').addClass('error');
                $('.wrap-password').append('<small class="error">Invalid password</small>');
              } else {
                App.__container__.lookup('controller:application').set('isSignedIn', true);
              }
            }
          } else {
            $('body').append('<div data-alert="" class="alert-box alert round">The input boxes are for input, people!<a href="" class="close">×</a></div>');
          }
          if (this.get('rememberMe')) {
            localStorage.isSignedIn = App.__container__.lookup('controller:application').get('isSignedIn');
          }
          localStorage.signedInAs = JSON.stringify(object);
          this.transitionTo('index');
        }
      }
    });
  });
define("appkit/controllers/tickets", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Controller.extend({
      isSignedIn: function () {
        return eval(localStorage.isSignedIn);
      }.property()
    });
  });
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
      pushUser: function (user) {
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
      this.resource('sighnin', function() {
        this.route('new');
      });
      this.resource('tickets', function() {
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
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Route.extend({});
  });
define("appkit/routes/sighnin", 
  ["appkit/lib/user-proxy","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var UserProxy = __dependency1__["default"];__exports__["default"] = Ember.Route.extend({
      model: function () {
        var users = UserProxy.create({});
        users.set('ref', new Firebase('https://traker.firebaseio.com/users'));
        return { users:users }
      }
    });
  });
define("appkit/routes/tickets", 
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
define("appkit/routes/tickets/index", 
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
        var object = {
          tickets: tickets,
          users: users
        };
        console.log(object);
        return object;
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