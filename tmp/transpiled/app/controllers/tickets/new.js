define("appkit/controllers/tickets/new", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Controller.extend({
      choices: [
        {
          urgency: "High",
          label: "High"
        },
        {
          urgency: "Medium",
          label: "Medium"
        },
        {
          urgency: "Low",
          label: "Low"
        }
      ]
    });
  });