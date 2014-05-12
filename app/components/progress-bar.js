export default Ember.Component.extend({
  i: null,
  didInsertElement: function () {
    var w = 0;
    this.i = setInterval(function () {
        this.$('.meter').css({
          width: (w++) + "%"
        });
        if (w >= 100) {
          clearInterval(i);
        }
    }, 16);
  },
  willDestroyElement: function () {
    clearInterval(this.i);
    this.$('.meter').css({
      width: "100%"
    });
  }
});
