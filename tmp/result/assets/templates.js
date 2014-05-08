define('appkit/templates/application', ['exports'], function(__exports__){ __exports__['default'] = Ember.Handlebars.compile("<nav role=\"navigation\" class=\"navigation\">\n  <div class=\"navigation-container\">\n    <ul class=\"logo-navigation\">\n      <li>\n        <a href=\"christopherdumas.org/TitanSoft-Labs/\" title=\"TitanSoft Labs\">TSL</a>\n      </li>\n    </ul>\n    <ul class=\"main-navigation\">\n      {{#if isSignedIn}}\n        {{#link-to 'index' tagName=\"li\" href=false}}<a {{bindAttr href=\"view.href\"}}>Dashboard</a>{{/link-to}}\n        {{#link-to 'tickets.new' tagName=\"li\" href=false}}<a {{bindAttr href=\"view.href\"}}>New Ticket</a>{{/link-to}}\n        {{#link-to 'tickets.index' tagName=\"li\" href=false}}<a {{bindAttr href=\"view.href\"}}>Tickets</a>{{/link-to}}\n        <li><a {{action 'logout'}}>Log Out</a></li>\n      {{else}}\n        {{#link-to 'sighnin.index' tagName=\"li\" href=false}}<a {{bindAttr href=\"view.href\"}}>Sign In</a>{{/link-to}}\n      {{/if}}\n    </ul>\n  </div>\n</nav>\n{{outlet}}\n"); });

define('appkit/templates/component-test', ['exports'], function(__exports__){ __exports__['default'] = Ember.Handlebars.compile(""); });

define('appkit/templates/components/pretty-color', ['exports'], function(__exports__){ __exports__['default'] = Ember.Handlebars.compile(""); });

define('appkit/templates/error', ['exports'], function(__exports__){ __exports__['default'] = Ember.Handlebars.compile("<h1>Sorry, Something went wrong</h1>\n{{message}}\n<pre>\n{{stack}}\n</pre>\n"); });

define('appkit/templates/helper-test', ['exports'], function(__exports__){ __exports__['default'] = Ember.Handlebars.compile("<h3>My name is {{reverse-word name}}.</h3>\n"); });

define('appkit/templates/index', ['exports'], function(__exports__){ __exports__['default'] = Ember.Handlebars.compile("<div class=\"text-center\">\n  {{#if isSignedIn}}\n    <h1>Welcome to your dashboard!</h1>\n    <h3 class=\"subheader\">From here, you can see everything!</h3>\n  {{else}}\n    <h1>Welcome to Traker, the ultimate teamwork app!</h1>\n    <h3 class=\"subheader\">To get started, just sign in!</h3>\n    {{#link-to 'sighnin.index' class=\"button success-darker\"}}Sign In{{/link-to}}\n  {{/if}}\n</div>\n"); });

define('appkit/templates/loading', ['exports'], function(__exports__){ __exports__['default'] = Ember.Handlebars.compile("<h1>Loading...</h1>\n"); });

define('appkit/templates/sighnin', ['exports'], function(__exports__){ __exports__['default'] = Ember.Handlebars.compile("<br/>\n<br/>\n<div class=\"large-4 columns text-center\">\n    <label><b>Email</b></label>\n    {{input type=\"text\" value=email placeholder=\"Enter your email address.\"}}\n    <img {{bind-attr src=image}}>\n    <label><b>Full Name</b></label>\n    {{input type=\"text\" value=name placeholder=\"Enter your full name\"}}\n    <label><b>Password</b></label>\n    <div class=\"wrap-password\">\n      {{input type=\"password\" class=\"password\" value=password placeholder=\"Enter your password.\"}}\n    </div>\n    <p>{{input type=\"checkbox\"  checked=rememberMe}} Remember Me</p>\n    <button class='button success' {{action 'submit'}}>Done!</button>\n</div>\n"); });

define('appkit/templates/tickets/index', ['exports'], function(__exports__){ __exports__['default'] = Ember.Handlebars.compile("<br/>\n<br/>\n<ul class='list-unstyled'>\n  {{log \"Tickets:\"}}\n  {{log tickets}}\n</ul>\n"); });

define('appkit/templates/tickets/new', ['exports'], function(__exports__){ __exports__['default'] = Ember.Handlebars.compile(""); });