export default Ember.Route.extend({
  model: function () {
    var users = this.store.findAll('user');
    return { users: users }
  }
});
