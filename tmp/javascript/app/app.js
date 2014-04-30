import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';

var App = Ember.Application.extend({
  modulePrefix: 'appkit', // TODO: loaded via config
  Resolver: Resolver,
   LOG_ACTIVE_GENERATION: true
});

loadInitializers(App, 'appkit');

export default App;
