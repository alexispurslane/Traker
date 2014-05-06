export default Ember.Handlebars.registerBoundHelper('index-get', function (outer, inner) {
  console.log(outer);
  return outer[inner];
});
