var Router = Ember.Router.extend();

Router.map(function() {
  this.resource('projects', function(){
    this.route('new');
    this.route('show', { path: ':project_id' });
    this.route('edit', { path: ':project_id/edit' });
  });
});

export default Router;
