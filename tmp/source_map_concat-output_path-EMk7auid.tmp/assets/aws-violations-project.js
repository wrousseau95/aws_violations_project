"use strict";



define('aws-violations-project/app', ['exports', 'aws-violations-project/resolver', 'ember-load-initializers', 'aws-violations-project/config/environment'], function (exports, _resolver, _emberLoadInitializers, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var App = Ember.Application.extend({
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix,
    Resolver: _resolver.default
  });

  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);

  exports.default = App;
});
define('aws-violations-project/components/welcome-page', ['exports', 'ember-welcome-page/components/welcome-page'], function (exports, _welcomePage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _welcomePage.default;
    }
  });
});
define('aws-violations-project/helpers/app-version', ['exports', 'aws-violations-project/config/environment', 'ember-cli-app-version/utils/regexp'], function (exports, _environment, _regexp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.appVersion = appVersion;
  var version = _environment.default.APP.version;
  function appVersion(_) {
    var hash = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (hash.hideSha) {
      return version.match(_regexp.versionRegExp)[0];
    }

    if (hash.hideVersion) {
      return version.match(_regexp.shaRegExp)[0];
    }

    return version;
  }

  exports.default = Ember.Helper.helper(appVersion);
});
define('aws-violations-project/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _pluralize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _pluralize.default;
});
define('aws-violations-project/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _singularize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _singularize.default;
});
define('aws-violations-project/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'aws-violations-project/config/environment'], function (exports, _initializerFactory, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var name = void 0,
      version = void 0;
  if (_environment.default.APP) {
    name = _environment.default.APP.name;
    version = _environment.default.APP.version;
  }

  exports.default = {
    name: 'App Version',
    initialize: (0, _initializerFactory.default)(name, version)
  };
});
define('aws-violations-project/initializers/container-debug-adapter', ['exports', 'ember-resolver/resolvers/classic/container-debug-adapter'], function (exports, _containerDebugAdapter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('aws-violations-project/initializers/data-adapter', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'data-adapter',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('aws-violations-project/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data'], function (exports, _setupContainer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-data',
    initialize: _setupContainer.default
  };
});
define('aws-violations-project/initializers/export-application-global', ['exports', 'aws-violations-project/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_environment.default.exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _environment.default.exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember.String.classify(_environment.default.modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports.default = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('aws-violations-project/initializers/injectStore', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'injectStore',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('aws-violations-project/initializers/store', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'store',
    after: 'ember-data',
    initialize: function initialize() {}
  };
});
define('aws-violations-project/initializers/transforms', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'transforms',
    before: 'store',
    initialize: function initialize() {}
  };
});
define("aws-violations-project/instance-initializers/ember-data", ["exports", "ember-data/initialize-store-service"], function (exports, _initializeStoreService) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: "ember-data",
    initialize: _initializeStoreService.default
  };
});
define('aws-violations-project/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberResolver.default;
});
define('aws-violations-project/router', ['exports', 'aws-violations-project/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var Router = Ember.Router.extend({
    location: _environment.default.locationType,
    rootURL: _environment.default.rootURL
  });

  Router.map(function () {
    this.route('untaggedresources');
  });

  exports.default = Router;
});
define("aws-violations-project/routes/untaggedresources", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({});


  // Async function for finding untagged Volumes
  function get_untag_vol(url, callback) {
    var volRequest = new XMLHttpRequest();
    volRequest.onreadystatechange = function () {
      if (volRequest.readyState === 4 && volRequest.status === 200) {
        callback.call(volRequest.responseXML);
        setTimeout(function () {
          // calling callback function
          var vol_parse = volRequest.responseText.replace(/\n/g, " ").split(" ");
          var arrayvol = vol_parse.filter(function (e) {
            return e === 0 || e;
          });

          function isEmpty(obj) {
            for (var key in obj) {
              if (obj.hasOwnProperty(key)) return false;
            }
            return true;
          }
          if (isEmpty(arrayvol)) {
            document.getElementById("uvt").innerHTML = "<h3>Awesome! None Untagged</h3>";
            document.getElementById("uvol").innerHTML = "<h3>Awesome! None Untagged</h3>";
          } else {
            // Object is NOT empty
            var ul = document.createElement('ul');
            document.getElementById("uvt").innerHTML = "<h4>Warning: Untagged volumes found</h4>";
            document.getElementById('uvol').appendChild(ul);
            arrayvol.forEach(function (name) {
              var li = document.createElement('li');
              ul.appendChild(li);
              li.innerHTML += name;
            });
          };
        }, 800);
      }
    };
    volRequest.open('GET', url, true);
    volRequest.send();
  }

  // Async callback for finding untagged Ec2 Instances
  function get_untag_ec2(url, callback) {
    var ec2Request = new XMLHttpRequest();
    ec2Request.onreadystatechange = function () {
      if (ec2Request.readyState === 4 && ec2Request.status === 200) {
        callback.call(ec2Request.responseXML);
        setTimeout(function () {
          // calling callback function
          var ec2_parse = ec2Request.responseText.replace(/\n/g, " ").split(" ");
          var arrayec2 = ec2_parse.filter(function (e) {
            return e === 0 || e;
          });

          function isEmpty(obj) {
            for (var key in obj) {
              if (obj.hasOwnProperty(key)) return false;
            }
            return true;
          }
          if (isEmpty(arrayec2)) {
            document.getElementById("uet").innerHTML = "<h3>Awesome! None Untagged</h3>";
            document.getElementById("uec2").innerHTML = "<h3>Awesome! None Untagged</h3>";
          } else {
            // Object is NOT empty
            var ul = document.createElement('ul');
            document.getElementById("uet").innerHTML = "<h4>Warning: Untagged instances found</h4>";
            document.getElementById('uec2').appendChild(ul);
            arrayec2.forEach(function (name) {
              var li = document.createElement('li');
              ul.appendChild(li);
              li.innerHTML += name;
            });
          };
        }, 10);
      }
    };
    ec2Request.open('GET', url, true);
    ec2Request.send();
  }

  // Async callback for finding unattached volumes
  function get_unat_vol(url, callback) {
    var unvolRequest = new XMLHttpRequest();
    unvolRequest.onreadystatechange = function () {
      if (unvolRequest.readyState === 4 && unvolRequest.status === 200) {
        callback.call(unvolRequest.responseXML);
        setTimeout(function () {
          // calling callback function
          var unvol_parse = unvolRequest.responseText.replace(/\n/g, " ").split(" ");
          var arrayunvol = unvol_parse.filter(function (e) {
            return e === 0 || e;
          });

          function isEmpty(obj) {
            for (var key in obj) {
              if (obj.hasOwnProperty(key)) return false;
            }
            return true;
          }
          if (isEmpty(arrayunvol)) {
            document.getElementById("uut").innerHTML = "<h3>Awesome! None unattached</h3>";
            document.getElementById("uaa").innerHTML = "<h3>Awesome! None unattached</h3>";
          } else {
            // Object is NOT empty
            var ul = document.createElement('ul');
            document.getElementById("uut").innerHTML = "<h4>Warning: Unattached volumes found</h4>";
            document.getElementById('uaa').appendChild(ul);
            arrayunvol.forEach(function (name) {
              var li = document.createElement('li');
              ul.appendChild(li);
              li.innerHTML += name;
            });
          };
        }, 10);
      }
    };
    unvolRequest.open('GET', url, true);
    unvolRequest.send();
  }

  // calling Async functions
  get_untag_vol("http://52.23.253.231/get_untagged_volumes", function () {});
  get_untag_ec2("http://52.23.253.231/get_untagged_instances", function () {});
  get_unat_vol("http://52.23.253.231/get_detached_volumes", function () {});
});
define('aws-violations-project/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _ajax) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ajax.default;
    }
  });
});
define("aws-violations-project/templates/application", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "YIjgAn27", "block": "{\"symbols\":[],\"statements\":[[1,[18,\"AWS-ViolationTracker\"],false],[0,\"\\n\\n\\n\\n\"],[1,[18,\"outlet\"],false]],\"hasEval\":false}", "meta": { "moduleName": "aws-violations-project/templates/application.hbs" } });
});
define("aws-violations-project/templates/untaggedresources", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "eRo7hXKc", "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\\n\"],[6,\"h2\"],[9,\"align\",\"center\"],[7],[0,\"Results for resources violations\"],[8],[0,\"\\n\"],[6,\"hr\"],[7],[8],[0,\"\\n\\n\"],[6,\"div\"],[9,\"class\",\"wrapper\"],[7],[0,\"\\n\\n\\n\"],[6,\"section\"],[9,\"class\",\"columns\"],[7],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"column\"],[9,\"style\",\"background-color:#1a254c;\"],[7],[0,\"\\n    \"],[6,\"h2\"],[9,\"id\",\"uvt\"],[9,\"style\",\"color:white\"],[7],[8],[0,\"\\n   \"],[6,\"p\"],[9,\"id\",\"uvol\"],[9,\"style\",\"color:white\"],[7],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"column\"],[9,\"style\",\"background-color:#434e77;\"],[7],[0,\"\\n    \"],[6,\"h2\"],[9,\"id\",\"uet\"],[9,\"style\",\"color:white\"],[7],[8],[0,\"\\n    \"],[6,\"p\"],[9,\"id\",\"uec2\"],[9,\"class\",\"ldBar\"],[9,\"data-value\",\"50\"],[9,\"style\",\"color:white\"],[7],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"column\"],[9,\"style\",\"background-color:#1a254c;\"],[7],[0,\"\\n    \"],[6,\"h2\"],[9,\"id\",\"uut\"],[9,\"style\",\"color:white\"],[7],[8],[0,\"\\n    \"],[6,\"p\"],[9,\"id\",\"uaa\"],[9,\"style\",\"color:white\"],[7],[8],[0,\"\\n\\n\"],[8],[0,\"\\n\"],[8],[0,\"\\n\\n\"],[6,\"footer\"],[7],[0,\"\\n    \"],[6,\"h3\"],[7],[0,\"Footer\"],[8],[0,\"\\n    \"],[6,\"p\"],[7],[0,\"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam, porro. Doloribus vitae non dolores modi dolorum commodi perspiciatis dicta nostrum minus esse, totam officia, quibusdam amet quas tempora? Voluptatibus, esse.\"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \\n\"],[8],[0,\"\\n\\n\\n\\n\\n\\n\"],[6,\"style\"],[9,\"type\",\"text/css\"],[7],[0,\"\\n@import url(https://fonts.googleapis.com/css?family=Open+Sans);\\n\\n* { box-sizing: border-box; }\\n\\nbody { \\n  font-family: 'Open Sans', sans-serif;\\n  color: #666;\\n}\\n\\n/* STRUCTURE */\\n\\n.wrapper {\\n  padding: 5px;\\n  max-width: 960px;\\n  width: 95%;\\n  margin: 20px auto;\\n}\\nheader {\\n  padding: 0 15px;\\n}\\n\\n.columns {\\n  display: flex;\\n  flex-flow: row wrap;\\n  justify-content: center;\\n  margin: 5px 0;\\n}\\n\\n.column {\\n  flex: 1;\\n  border: 1px solid gray;\\n  margin: 2px;\\n  padding: 10px;\\n  &:first-child { margin-left: 0; }\\n  &:last-child { margin-right: 0; }\\n  \\n}\\n\\nfooter {\\n  padding: 0 15px;\\n}\\n\\n\\n@media screen and (max-width: 980px) {\\n  .columns .column {\\n    margin-bottom: 5px;\\n    flex-basis: 40%;\\n    &:nth-last-child(2) {\\n      margin-right: 0;\\n    }\\n    &:last-child {\\n      flex-basis: 100%;\\n      margin: 0;\\n    }\\n  }\\n}\\n\\n@media screen and (max-width: 680px) {\\n  .columns .column {\\n    flex-basis: 100%;\\n    margin: 0 0 5px 0;\\n  }\\n}  \\n\"],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "aws-violations-project/templates/untaggedresources.hbs" } });
});


define('aws-violations-project/config/environment', [], function() {
  var prefix = 'aws-violations-project';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

if (!runningTests) {
  require("aws-violations-project/app")["default"].create({"name":"aws-violations-project","version":"0.0.0+61632f92"});
}
//# sourceMappingURL=aws-violations-project.map
