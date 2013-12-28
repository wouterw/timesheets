export default Ember.Route.extend(Ember.SimpleAuth.AuthenticatedRouteMixin, {
  model: function() {
    return this.store.find('project');
  },

  actions: {
    createProject: function() {
      this.send('openModal', 'projects.new');
    }
  }
});
