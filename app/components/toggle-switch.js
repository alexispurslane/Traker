export default Ember.Component.extend({
  didInsertElement: function () {
    var s = new Switch(document.querySelector('input[type="checkbox"]'));
    s.el.addEventListener('click', function(e){
      e.preventDefault();
      s.toggle();
    }, false);
  }
});
