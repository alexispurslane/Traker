export default Ember.Controller.extend({
  isSignedIn: function () {
    return App.__container__.lookup('controller:application').get('isSignedIn');
  }.property(),

});
