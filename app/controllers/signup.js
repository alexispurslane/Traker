export default Ember.Controller.extend({
  url: function () {
    return 'mailto:' + this.get('email');
  }.property('email'),
  image: function () {
    return 'http://gravitar.com/images/' + md5(this.get('email'));
  }.property('email'),
  actions: {
    submit: function () {
      if (this.get('name') != undefined && this.get('email') != undefined && this.get('password') != undefined) {
        var users = this.get('model.users.content.content');
        var model = this.get('model.users');
        var _this = this;
        users.forEach(function (e) {
          var el = e._data;
          if (el.name === _this.get('name')) {
            _this.set('nameTaken', true);
          }
        });
        if (this.get('nameTaken') === true) {
          var _this = this;
          setTimeout(function () {
            _this.transitionTo('index');
          }, 1000);
        } else {
          model.createRecord('user', {
            name: this.get('name'),
            email: this.get('email'),
            url: this.get('url'),
            image: this.get('image'),
            password: this.get('password')
          }).save();
          App.__container__.lookup('controller:application').set('isSignedIn', true);
          if (this.get('rememberMe')) {
            localStorage.isSignedIn = App.__container__.lookup('controller:application').get('isSignedIn');
          }
          localStorage.signedInAs = JSON.stringify(object);
          this.transitionTo('index');
        }
      } else {
        this.set('formsNotFilled', true);
      }
    }
  }
});
