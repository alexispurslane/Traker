define("appkit/lib/user-proxy", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.ArrayProxy.extend({
      ref: null,
      loadContent: function () {
        var that = this;
        this.ref.on('value', function (snapshot) {
          var users = _.map(snapshot.val(), function (value, key) {
            value.id = key;
            return value;
          });
          that.set('content', users);
        });
      }.observes('ref'),
      pushUser: function (user) {
        this.ref.push(user);
      }
    });
  });