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
  assert.ok(false, 'routes/untaggedresources.js should pass ESLint\n\n51:1 - Do not use global `$` or `jQuery` (ember/no-global-jquery)\n51:1 - \'$\' is not defined. (no-undef)\n58:1 - \'$\' is not defined. (no-undef)\n58:1 - Do not use global `$` or `jQuery` (ember/no-global-jquery)\n66:5 - Unnecessary semicolon. (no-extra-semi)\n95:1 - Do not use global `$` or `jQuery` (ember/no-global-jquery)\n95:1 - \'$\' is not defined. (no-undef)\n102:1 - Do not use global `$` or `jQuery` (ember/no-global-jquery)\n102:1 - \'$\' is not defined. (no-undef)\n110:5 - Unnecessary semicolon. (no-extra-semi)\n139:1 - Do not use global `$` or `jQuery` (ember/no-global-jquery)\n139:1 - \'$\' is not defined. (no-undef)\n146:1 - \'$\' is not defined. (no-undef)\n146:1 - Do not use global `$` or `jQuery` (ember/no-global-jquery)\n154:5 - Unnecessary semicolon. (no-extra-semi)');
});

