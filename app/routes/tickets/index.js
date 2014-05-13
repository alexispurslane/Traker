export default Ember.Route.extend({
  model: function() {
    return this.store.findAll('ticket');
  },
  setupController: function(controller, model) {
    controller.set('model', model);
  }
});
