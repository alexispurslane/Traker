export default Ember.Controller.extend({
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
