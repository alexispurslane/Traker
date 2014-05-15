export default Ember.Controller.extend({
  url: function () {
    return 'mailto:' + this.get('email');
  }.property('email'),
  image: function () {
    return 'http://gravitar.com/images/' + md5(this.get('email'));
  }.property('email')
  actions: {
    submit: function () {
      var users = this.get('model.users.content.content');
      var model = this.get('model.users');
      users.forEach(function (e) {
        var el = e._data;
        if (el.name === this.get('name')) {
          this.set('nameTaken', true);
        }
      });
      if (this.get('nameTaken') === true) {
        
      } else {
        model.createRecord('user', {
          name: this.get('name'),
          email: this.get('email'),
          url: this.get('url'),
          image: this.get('image'),
          password: this.get('password')
        }).save();
      }
    }
  }
});
