import Application from 'appkit/app';
import Router from 'appkit/router';

function startApp(attrs) {
  var App;

  var attributes = Ember.merge({
    rootElement: '#ember-testing',
    testing: true,
    LOG_ACTIVE_GENERATION: false,
    LOG_VIEW_LOOKUPS: false
  }, attrs);

  Ember.run.join(function(){
    App = Application.create(attributes);
  });

  Router.reopen({
    location: 'none'
  });

  App.reset(); // this shouldn't be needed, i want to be able to "start an app at a specific URL"

  return App;
}

export default startApp;
