import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import indexGet from 'appkit/helpers/index-get';
var App = Ember.Application.extend({
  modulePrefix: 'appkit', // TODO: loaded via config
  Resolver: Resolver,
   LOG_ACTIVE_GENERATION: true
});
loadInitializers(App, 'appkit');

export default App;
