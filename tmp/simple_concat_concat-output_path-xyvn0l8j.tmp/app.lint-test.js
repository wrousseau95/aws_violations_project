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
  assert.ok(false, 'routes/untaggedresources.js should pass ESLint\n\n40:5 - Unnecessary semicolon. (no-extra-semi)\n82:5 - Unnecessary semicolon. (no-extra-semi)\n124:5 - Unnecessary semicolon. (no-extra-semi)');
});

