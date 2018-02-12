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

  QUnit.test('routes/untaggedresources.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/untaggedresources.js should pass ESLint\n\n49:1 - Do not use global `$` or `jQuery` (ember/no-global-jquery)\n49:1 - \'$\' is not defined. (no-undef)\n56:1 - \'$\' is not defined. (no-undef)\n56:1 - Do not use global `$` or `jQuery` (ember/no-global-jquery)\n64:5 - Unnecessary semicolon. (no-extra-semi)\n93:1 - Do not use global `$` or `jQuery` (ember/no-global-jquery)\n93:1 - \'$\' is not defined. (no-undef)\n100:1 - Do not use global `$` or `jQuery` (ember/no-global-jquery)\n100:1 - \'$\' is not defined. (no-undef)\n108:5 - Unnecessary semicolon. (no-extra-semi)\n137:1 - Do not use global `$` or `jQuery` (ember/no-global-jquery)\n137:1 - \'$\' is not defined. (no-undef)\n144:1 - \'$\' is not defined. (no-undef)\n144:1 - Do not use global `$` or `jQuery` (ember/no-global-jquery)\n152:5 - Unnecessary semicolon. (no-extra-semi)');
  });
});