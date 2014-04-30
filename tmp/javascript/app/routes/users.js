import UserProxy from 'appkit/lib/user-proxy';
export default Ember.Route.extend({
  model: function() {
    var users = UserProxy.create({});
    users.set('ref', new Firebase('http://traker.firebaseio.com/users'));
    return users;
  }
});
