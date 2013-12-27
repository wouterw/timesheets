// Put general configuration here. This file is included
// in both production and development BEFORE Ember is
// loaded.

window.ENV = {
  FEATURES: {
    'with-controller': true,
    'query-params': true,
    'string-parameterize': true,
    'ember-routing-named-substates': true,
    'ember-testing-lazy-routing': true,
    'ember-testing-simple-setup': true,
    'ember-testing-routing-helpers': true,
    'ember-testing-triggerEvent-helper': true
  }
};
