export default Ember.Controller.extend({
  isSignedIn: function () {
    return eval(localStorage.isSignedIn);
  }.property(),
});
