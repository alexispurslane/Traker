define("appkit/models/ticket", 
  ["exports"],
  function(__exports__) {
    "use strict";
    var Ticket = DS.Model.extend({
      subject: DS.attr(),
      body: DS.attr(),
      urgency: DS.attr()
    });
    Ticket.FIXTURES = [
      { id: 1,
        subject: 'ONE!',
        body: 'ONEONEONEONEOENEINEOEMNEOEENEOENEOENEOENEOENEOEENEEOMEEOEMEOEEMEOEMEONEOEMEN!!!!!!!!!!!!'
      }
    ];
    __exports__["default"] = Ticket;
  });