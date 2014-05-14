export default Ember.Controller.extend({
  urgencies: ['High', 'Medium', 'Low'],
  consoleLogChange: function () {
    console.log(this.get('urgency'));
  }.observes('urgency'),
  toUpdate: function () {
    this.set('to', [this.get('to0')]);
  }.observes('to0'),
  actions: {
    submit: function () {
      var by = JSON.parse(localStorage.signedInAs).name;
      this.store.createRecord('ticket', {
        urgency: this.get('urgency'),
        body: this.get('body'),
        subject: this.get('subject'),
        to: this.get('to'),
        by: by
      }).save();
      console.log({
        urgency: this.get('urgency'),
        body: this.get('body'),
        subject: this.get('subject'),
        to: this.get('to'),
        by: by
      });
    }
  }
});
