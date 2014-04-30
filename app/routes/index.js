import TicketProxy from 'appkit/lib/ticket-proxy';
export default Ember.Route.extend({
  model: function() {
    var tickets = TicketProxy.create({});
    tickets.set('ref', new Firebase('http://traker.firebaseio.com/tickets'));
    return tickets;
  }
});
