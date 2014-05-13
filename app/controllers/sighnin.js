export default Ember.Controller.extend({
  needs: ['application'],
  image: function () {
    return 'http://www.gravatar.com/avatar/' + md5(this.get('email'));
  }.property('email'),
  url: function () {
    return 'mailto:' + this.get('email');
  }.property('email'),
  isSignedIn: function () {
    return localStorage.isSignedIn;
  }.property(),
  actions: {
    toggle: function () {
      console.log('toggle');
      this.set('rememberMe', !this.get('rememberMe'));
    },
    submit: function () {
      $('.alert-box').remove();
      var users = this.get('model.users.content');
      var object = {  
        image: this.get('image'),
        url: this.get('url'),
        name: this.get('name'),
        email: this.get('email'),
        password: this.get('password')
      };
      function filterFunc (el) {
        return el.email === object.email && el.name === object.name;
      }
      function arraysEqual(a,b) { return !(a<b || b<a); }
      if (object.email != undefined && object.password != undefined) {
        if (arraysEqual(_.filter(users, filterFunc), new Array(0))) {
          this.store.createRecord('user', object);
          App.__container__.lookup('controller:application').set('isSignedIn', true);
        } else {
          var match = _.filter(users, filterFunc);
          if (match[0].password != object.password) {
            $('.password').addClass('error');
            $('.wrap-password').append('<small class="error">Invalid password</small>');
          } else {
            App.__container__.lookup('controller:application').set('isSignedIn', true);
          }
        }
      } else {
        $('body').append('<div data-alert="" class="alert-box alert round">The input boxes are for input, people!<a href="" class="close">×</a></div>');
      }
      if (this.get('rememberMe')) {
        localStorage.isSignedIn = App.__container__.lookup('controller:application').get('isSignedIn');
      }
      localStorage.signedInAs = JSON.stringify(object);
      this.transitionTo('index');
    }
  }
});
