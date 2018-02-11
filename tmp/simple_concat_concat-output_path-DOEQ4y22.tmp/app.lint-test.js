QUnit.module('ESLint | app');

QUnit.test('app.js', function(assert) {
  assert.expect(1);
  assert.ok(true, 'app.js should pass ESLint\n\n');
});

QUnit.test('resolver.js', function(assert) {
  assert.expect(1);
  assert.ok(true, 'resolver.js should pass ESLint\n\n');
});

QUnit.test('router.js', function(assert) {
  assert.expect(1);
  assert.ok(true, 'router.js should pass ESLint\n\n');
});

QUnit.test('routes/untaggedresources.js', function(assert) {
  assert.expect(1);
  assert.ok(false, 'routes/untaggedresources.js should pass ESLint\n\n32:1 - Do not use global `$` or `jQuery` (ember/no-global-jquery)\n32:1 - \'$\' is not defined. (no-undef)\n39:1 - \'$\' is not defined. (no-undef)\n39:1 - Do not use global `$` or `jQuery` (ember/no-global-jquery)\n47:5 - Unnecessary semicolon. (no-extra-semi)\n76:1 - Do not use global `$` or `jQuery` (ember/no-global-jquery)\n76:1 - \'$\' is not defined. (no-undef)\n83:1 - Do not use global `$` or `jQuery` (ember/no-global-jquery)\n83:1 - \'$\' is not defined. (no-undef)\n91:5 - Unnecessary semicolon. (no-extra-semi)\n120:1 - Do not use global `$` or `jQuery` (ember/no-global-jquery)\n120:1 - \'$\' is not defined. (no-undef)\n127:1 - \'$\' is not defined. (no-undef)\n127:1 - Do not use global `$` or `jQuery` (ember/no-global-jquery)\n135:5 - Unnecessary semicolon. (no-extra-semi)');
});

