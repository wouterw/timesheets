export default Ember.Component.extend({
  title: 'Untitled',

  show: function() {
    var $modal = this.$().find('.modal');
    var $backdrop = this.$().find('.modal-backdrop');

    $backdrop.addClass('in');
    $modal.addClass('in');
    $modal.show();
  }.on('didInsertElement'),

  actions: {
    close: function() {
      return this.sendAction();
    }
  }
});
