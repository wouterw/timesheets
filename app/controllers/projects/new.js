export default Ember.ObjectController.extend({

  error: Ember.K,

  init: function() {
    this.set('model', this.store.createRecord('project'));
  },

  actions: {
    save: function() {
      var self = this;
      this.get('model').save().then(function(){
        self.send('closeModal');
      }, function(model) {
        self.set('error', model.error());
      });
    },

    close: function() {
      var model = this.get('model');
      if (model.get('isNew')) model.deleteRecord();
      this.send('closeModal');
    }
  }
});
