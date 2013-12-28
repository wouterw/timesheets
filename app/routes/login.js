export default Ember.Route.extend({
  // make sure the controller doesn't keep stale data
  setupController: function(controller, model) {
    controller.setProperties({
      identification: undefined,
      password: undefined,
      errorMessage: undefined
    });
  }
});
