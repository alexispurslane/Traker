var attr = DS.attr;
var User = DS.Model.extend({
  email: attr(),
  image: attr(),
  name: attr(),
  password: attr(),
  url: attr()
});
export default User;
