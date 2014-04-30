import { test, moduleFor } from 'ember-qunit';


import Index from 'appkit/routes/index';
import Ticket from 'appkit/models/ticket';
moduleFor('route:index', "Unit - IndexRoute");

test("it exists", function(){
  ok(this.subject() instanceof Index);
});
test("it returns the ticket FIXTURES", function(){
  equal(this.subject().model(), Ticket.FIXTURES);
});
