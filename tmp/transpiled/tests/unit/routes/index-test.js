define("appkit/tests/unit/routes/index-test", 
  ["ember-qunit","appkit/routes/index","appkit/models/ticket"],
  function(__dependency1__, __dependency2__, __dependency3__) {
    "use strict";
    var test = __dependency1__.test;
    var moduleFor = __dependency1__.moduleFor;


    var Index = __dependency2__["default"];
    var Ticket = __dependency3__["default"];
    moduleFor('route:index', "Unit - IndexRoute");

    test("it exists", function(){
      ok(this.subject() instanceof Index);
    });
    test("it returns the ticket FIXTURES", function(){
      equal(this.subject().model(), Ticket.FIXTURES);
    });
  });