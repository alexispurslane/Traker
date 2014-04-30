var Router = Ember.Router.extend(); // ensure we don't share routes between all Router instances

Router.map(function() {
  this.route('component-test');
  this.route('helper-test');
  this.resource('users', function() {
    this.route('new');
  });
  //this.resource('user', { path: '/user/:user_id' });
});

export default Router;