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
    this.route('resourceviolations');
    this.route('untaggedresources');
  });

  exports.default = Router;
});
define('aws-violations-project/routes/resourceviolations', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({});
});
define("aws-violations-project/routes/untaggedresources", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({});

  // I wrote this non-asynchronus to get untagged volumes and it caused problems
  //var vol = new XMLHttpRequest();
  //vol.open("GET", "http://localhost:5000/get_untagged_volumes", true);
  //vol.onreadystatechange = function () {
  //  if (vol.readyState == 4) {   
  //var vol_parse =(vol.responseText.replace( /\n/g, " " ).split( " " ));
  //  var arrayvol = vol_parse.filter(function(e){ return e === 0 || e });
  //
  //		var ul = document.createElement('ul');
  //	document.getElementById('uvol').appendChild(ul);
  //
  //		arrayvol.forEach(function(name){
  //			var li = document.createElement('li');
  //			ul.appendChild(li);
  //			li.innerHTML += name;
  //		});
  //}
  //}
  //vol.send()
  // Here is the asynchronus version for getting untagged volumes :-) 
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

  // Here is the asynchronus version for getting untagged instances :-) 
  function get_untag_ec2(url, callback) {
    var ec2Request = new XMLHttpRequest();
    ec2Request.onreadystatechange = function () {
      if (ec2Request.readyState === 4 && ec2Request.status === 200) {
        callback.call(ec2Request.responseXML);

        // calling callback function
        var ec2_parse = ec2Request.responseText.replace(/\n/g, " ").split(" ");
        var arrayec2 = ec2_parse.filter(function (e) {
          return e === 0 || e;
        });

        var ul = document.createElement('ul');
        document.getElementById('uec2').appendChild(ul);

        arrayec2.forEach(function (name) {
          var li = document.createElement('li');
          ul.appendChild(li);
          li.innerHTML += name;
        });
      }
    };
    ec2Request.open('GET', url, true);
    ec2Request.send();
  }

  // calling Async functions
  get_untag_vol("http://localhost:5000/get_untagged_volumes", function () {});
  get_untag_ec2("http://localhost:5000/get_untagged_instances", function () {});
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
define("aws-violations-project/templates/resourceviolations", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "fF3LpGpD", "block": "{\"symbols\":[],\"statements\":[[1,[18,\"outlet\"],false]],\"hasEval\":false}", "meta": { "moduleName": "aws-violations-project/templates/resourceviolations.hbs" } });
});
define("aws-violations-project/templates/untaggedresources", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "xmzibrZo", "block": "{\"symbols\":[],\"statements\":[[6,\"h2\"],[9,\"align\",\"center\"],[7],[0,\"Results for resources violations\"],[8],[0,\"\\n\"],[6,\"hr\"],[7],[8],[0,\"\\n\"],[6,\"div\"],[9,\"class\",\"row\"],[7],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"column\"],[9,\"style\",\"background-color:#aaa;\"],[7],[0,\"\\n    \"],[6,\"h2\"],[9,\"id\",\"uvt\"],[7],[8],[0,\"\\n    \"],[6,\"p\"],[9,\"id\",\"uvol\"],[7],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"column\"],[9,\"style\",\"background-color:#bbb;\"],[7],[0,\"\\n    \"],[6,\"h2\"],[7],[0,\"Untagged ec2 \"],[8],[0,\"\\n    \"],[6,\"p\"],[9,\"id\",\"uec2\"],[9,\"class\",\"ldBar\"],[9,\"data-value\",\"50\"],[7],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"column\"],[9,\"style\",\"background-color:#ccc;\"],[7],[0,\"\\n    \"],[6,\"h2\"],[7],[0,\"Unattached volumes\"],[8],[0,\"\\n    \"],[6,\"p\"],[9,\"id\",\"us3\"],[7],[8],[0,\"\\n  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\\n\"],[1,[18,\"outlet\"],false]],\"hasEval\":false}", "meta": { "moduleName": "aws-violations-project/templates/untaggedresources.hbs" } });
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
  require("aws-violations-project/app")["default"].create({"name":"aws-violations-project","version":"0.0.0+95c6907f"});
}
//# sourceMappingURL=aws-violations-project.map
