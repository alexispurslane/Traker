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