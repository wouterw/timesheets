test('authentication works correctly', function() {

  visit('/').then(function() {
    testIsNotAuthenticated();
  });

  visit('/login')
    .fillIn('#identification', '')
    .fillIn('#password', '')
    .click('button[type="submit"]', '')
    .then(function() {
      testIsNotAuthenticated();
    });

  visit('/login')
    .fillIn('#identification', 'ember')
    .fillIn('#password', 'password')
    .click('button[type="submit"]')
    .then(function() {
      ok(!exists('button:contains(Login)'), 'Login button is not displayed when authenticated');
      ok(exists('button:contains(Logout)'), 'Logout button is displayed when authenticated');
    });

});

function testIsNotAuthenticated() {
  ok(exists('button:contains(Login)'), 'Login button is displayed when not authenticated');
  ok(!exists('button:contains(Logout)'), 'Logout button is not displayed when not authenticated');
}
