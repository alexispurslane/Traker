define("appkit/routes/sighnin", 
  ["appkit/lib/user-proxy","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var UserProxy = __dependency1__["default"];__exports__["default"] = Ember.Route.extend({
      model: function () {
        var users = UserProxy.create({});
        users.set('ref', new Firebase('https://traker.firebaseio.com/users'));
        return { users:users }
      }
    });
  });