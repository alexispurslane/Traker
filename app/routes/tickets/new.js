export default Ember.Route.extend({
  model: function() {
    return {
      tickets: this.store.findAll('ticket'),
      users:   this.store.findAll('user')
    };
  },
  setupController: function(controller, model) {
    controller.set('model', model);
  }
});
