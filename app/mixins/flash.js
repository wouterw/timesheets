export default Ember.Mixin.extend({
  flash: function(message, messageClass) {
    this.set('flashMessage', Ember.Object.create({
      message: message,
      messageClass: messageClass
    }));
  }
});
