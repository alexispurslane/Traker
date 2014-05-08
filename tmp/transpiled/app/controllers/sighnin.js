define("appkit/controllers/sighnin", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Controller.extend({
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
        submit: function () {
          $('.alert-box').remove();
          var users = this.get('model.users.content');
          var userProxy = this.get('model.users');
          var object = {  
            image: this.get('image'),
            url: this.get('url'),
            name: this.get('name'),
            email: this.get('email'),
            password: this.get('password')
          };
          function arraysEqual(a,b) { return !(a<b || b<a); }
          if (object.email != undefined && object.password != undefined) {
            if (arraysEqual(_.where(users, { email:object.email }), new Array(0))) {
              userProxy.pushUser(object);
              App.__container__.lookup('controller:application').set('isSignedIn', true);
            } else {
              var match = _.where(users, { email:object.email });
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
        }
      }
    });
  });