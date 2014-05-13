export default Ember.Component.extend({
  didInsertElement: function () {
    var s = new Switch(document.querySelector('input[type="checkbox"]'));
    var _this = this;
    function externalToggleBind(){
      var controller = App.__container__.lookup("controller:sighnin");
      var boundSend = controller.send.bind(controller);
      boundSend('toggle');
    }
    s.el.addEventListener('click', function(e){
      e.preventDefault();
      s.toggle();
      externalToggleBind();
    }, false);
  }
});
