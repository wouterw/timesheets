var Router = Ember.Router.extend({ location: 'history' });

Router.map(function() {

  this.route('login');

  this.resource('projects', function(){
    this.route('show', { path: ':project_id' });
  });

});

export default Router;
