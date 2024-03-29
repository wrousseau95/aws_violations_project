define('aws-violations-project/tests/app.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | app');

  QUnit.test('app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass ESLint\n\n');
  });

  QUnit.test('resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass ESLint\n\n');
  });

  QUnit.test('router.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass ESLint\n\n');
  });

  QUnit.test('routes/resourceviolations.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/resourceviolations.js should pass ESLint\n\n');
  });

  QUnit.test('routes/untaggedresources-loading.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/untaggedresources-loading.js should pass ESLint\n\n9:25 - \'originRoute\' is defined but never used. (no-unused-vars)');
  });

  QUnit.test('routes/untaggedresources.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/untaggedresources.js should pass ESLint\n\n');
  });
});