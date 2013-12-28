export default Ember.Controller.extend(Ember.SimpleAuth.LoginControllerMixin, {
  actions: {
    loginFailed: function(xhr, status, error) {
      var response = JSON.parse(xhr.responseText);
      this.set('errorMessage', response.error);
    }
  }
});
