define("appkit/lib/ticket-proxy", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.ArrayProxy.extend({
      ref: null,
      loadContent: function () {
        var that = this;
        this.ref.on('value', function (snapshot) {
          var tickets = _.map(snapshot.val(), function (value, key) {
            value.id = key;
            return value;
          });
          that.set('content', tickets);
        });
      }.observes('ref'),
      pushTicket: function (ticket) {
        this.ref.push(ticket);
      }
    });
  });