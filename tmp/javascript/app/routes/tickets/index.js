import TicketProxy from 'appkit/lib/ticket-proxy';
import UserProxy from 'appkit/lib/user-proxy';
export default Ember.Route.extend({
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
