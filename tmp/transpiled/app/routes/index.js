define("appkit/routes/index", 
  ["appkit/lib/ticket-proxy","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var TicketProxy = __dependency1__["default"];
    __exports__["default"] = Ember.Route.extend({
      model: function() {
        var tickets = TicketProxy.create({});
        tickets.set('ref', new Firebase('http://traker.firebaseio.com/tickets'));
        return tickets;
      }
    });
  });