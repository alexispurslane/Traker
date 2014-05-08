import UserProxy from 'appkit/lib/user-proxy'

export default Ember.Route.extend({
  model: function () {
    var users = UserProxy.create({});
    users.set('ref', new Firebase('https://traker.firebaseio.com/users'));
    return { users:users }
  }
});
