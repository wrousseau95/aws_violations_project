'use strict';

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
    assert.ok(false, 'routes/untaggedresources.js should pass ESLint\n\n32:1 - Do not use global `$` or `jQuery` (ember/no-global-jquery)\n32:1 - \'$\' is not defined. (no-undef)\n39:1 - \'$\' is not defined. (no-undef)\n39:1 - Do not use global `$` or `jQuery` (ember/no-global-jquery)\n47:5 - Unnecessary semicolon. (no-extra-semi)\n76:1 - Do not use global `$` or `jQuery` (ember/no-global-jquery)\n76:1 - \'$\' is not defined. (no-undef)\n83:1 - Do not use global `$` or `jQuery` (ember/no-global-jquery)\n83:1 - \'$\' is not defined. (no-undef)\n91:5 - Unnecessary semicolon. (no-extra-semi)\n120:1 - Do not use global `$` or `jQuery` (ember/no-global-jquery)\n120:1 - \'$\' is not defined. (no-undef)\n127:1 - \'$\' is not defined. (no-undef)\n127:1 - Do not use global `$` or `jQuery` (ember/no-global-jquery)\n135:5 - Unnecessary semicolon. (no-extra-semi)');
  });
});
define('aws-violations-project/tests/helpers/destroy-app', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = destroyApp;
  function destroyApp(application) {
    Ember.run(application, 'destroy');
  }
});
define('aws-violations-project/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'aws-violations-project/tests/helpers/start-app', 'aws-violations-project/tests/helpers/destroy-app'], function (exports, _qunit, _startApp, _destroyApp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (name) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _startApp.default)();

        if (options.beforeEach) {
          return options.beforeEach.apply(this, arguments);
        }
      },
      afterEach: function afterEach() {
        var _this = this;

        var afterEach = options.afterEach && options.afterEach.apply(this, arguments);
        return Ember.RSVP.resolve(afterEach).then(function () {
          return (0, _destroyApp.default)(_this.application);
        });
      }
    });
  };
});
define('aws-violations-project/tests/helpers/start-app', ['exports', 'aws-violations-project/app', 'aws-violations-project/config/environment'], function (exports, _app, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = startApp;
  function startApp(attrs) {
    var attributes = Ember.merge({}, _environment.default.APP);
    attributes.autoboot = true;
    attributes = Ember.merge(attributes, attrs); // use defaults, but you can override;

    return Ember.run(function () {
      var application = _app.default.create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
      return application;
    });
  }
});
define('aws-violations-project/tests/test-helper', ['aws-violations-project/app', 'aws-violations-project/config/environment', '@ember/test-helpers', 'ember-qunit'], function (_app, _environment, _testHelpers, _emberQunit) {
  'use strict';

  (0, _testHelpers.setApplication)(_app.default.create(_environment.default.APP));

  (0, _emberQunit.start)();
});
define('aws-violations-project/tests/tests.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | tests');

  QUnit.test('helpers/destroy-app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/destroy-app.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/module-for-acceptance.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/module-for-acceptance.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/start-app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass ESLint\n\n');
  });

  QUnit.test('test-helper.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/untaggedresources-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/untaggedresources-test.js should pass ESLint\n\n');
  });
});
define('aws-violations-project/tests/unit/routes/untaggedresources-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:untaggedresources', 'Unit | Route | untaggedresources', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
require('aws-violations-project/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map
