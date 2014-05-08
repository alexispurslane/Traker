export default Ember.Controller.extend({
  isSignedIn: function () {
    if (localStorage.isSignedIn != undefined) {
      return localStorage.isSignedIn;
    } else {
      return false;
    }
  }.property(),
  actions: {
    logout: function () {
      localStorage.isSignedIn = false;
      this.transitionTo('sighnin');
    }
  }
});
