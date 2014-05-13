export default Ember.Controller.extend({
  tickets: function () {
    var model = this.get('model');
    var tickets = _.filter(model.content, function (e) {
      var el = e._data;
      return _.contains(el.to, JSON.parse(localStorage.signedInAs).name);
    });
    console.log(tickets);
    return tickets;
  }.property('model')
});
