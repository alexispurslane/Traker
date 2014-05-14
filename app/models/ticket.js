var attr = DS.attr;
var Ticket = DS.Model.extend({
  subject: attr(),
  body: attr(),
  by: attr(),
  to: attr(),
  urgency: attr()
});
export default Ticket;
