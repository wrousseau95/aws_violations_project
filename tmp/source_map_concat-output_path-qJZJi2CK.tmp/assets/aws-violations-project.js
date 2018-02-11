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
define('aws-violations-project/components/loading-slider', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  var Component = Ember.Component,
      run = Ember.run,
      isBlank = Ember.isBlank,
      inject = Ember.inject,
      on = Ember.on;
  exports.default = Component.extend({
    tagName: 'div',
    classNames: ['loading-slider'],
    classNameBindings: 'expanding',
    progressBarClass: null,

    loadingSlider: inject.service(),

    init: function init() {
      this._super.apply(this, arguments);

      if (isFastBoot()) {
        return;
      }

      run.once(this, function () {
        this.get('loadingSlider').on('startLoading', this, this._startLoading);
        this.get('loadingSlider').on('endLoading', this, this._endLoading);
        this.get('loadingSlider').on('changeAttrs', this, this._changeAttrs);
      });
    },


    setAttrsThenManage: on('didReceiveAttrs', function () {

      if (isFastBoot()) {
        return;
      }

      this.setProperties({
        isLoading: this.getAttr('isLoading'),
        duration: this.getAttr('duration'),
        expanding: this.getAttr('expanding'),
        speed: this.getAttr('speed'),
        color: this.getAttr('color')
      });

      this.manage();
    }),

    willDestroy: function willDestroy() {
      run.once(this, function () {
        this.get('loadingSlider').off('startLoading', this, this._startLoading);
        this.get('loadingSlider').off('endLoading', this, this._endLoading);
        this.get('loadingSlider').off('changeAttrs', this, this._changeAttrs);
      });
    },
    _startLoading: function _startLoading() {
      this.set('isLoading', true);
      this.manage();
    },
    _endLoading: function _endLoading() {
      this.set('isLoading', false);
    },
    _changeAttrs: function _changeAttrs(attrs) {
      this.setProperties(attrs);
      this.manage();
    },
    manage: function manage() {
      if (isBlank(this.$())) {
        return;
      }

      if (this.get('isLoading')) {
        if (this.get('expanding')) {
          this.expandingAnimate.call(this);
        } else {
          this.animate.call(this);
        }
      } else {
        this.set('isLoaded', true);
      }
    },
    animate: function animate() {
      this.set('isLoaded', false);
      var self = this,
          elapsedTime = 0,
          inner = $('<span class="loading-slider__progress ' + this.get('progressBarClass') + '">'),
          outer = this.$(),
          duration = this.getWithDefault('duration', 300),
          innerWidth = 0,
          outerWidth = this.$().width(),
          stepWidth = Math.round(outerWidth / 50),
          color = this.get('color');

      outer.append(inner);
      if (color) {
        inner.css('background-color', color);
      }

      var interval = window.setInterval(function () {
        elapsedTime = elapsedTime + 10;
        inner.width(innerWidth = innerWidth + stepWidth);

        // slow the animation if we used more than 75% the estimated duration
        // or 66% of the animation width
        if (elapsedTime > duration * 0.75 || innerWidth > outerWidth * 0.66) {
          // don't stop the animation completely
          if (stepWidth > 1) {
            stepWidth = stepWidth * 0.97;
          }
        }

        if (innerWidth > outerWidth) {
          run.later(function () {
            outer.empty();
            window.clearInterval(interval);
          }, 50);
        }

        // the activity has finished
        if (self.get('isLoaded')) {
          // start with a sizable pixel step
          if (stepWidth < 10) {
            stepWidth = 10;
          }
          // accelerate to completion
          stepWidth = stepWidth + stepWidth;
        }
      }, 10);
    },
    expandingAnimate: function expandingAnimate() {
      var self = this,
          outer = this.$(),
          speed = this.getWithDefault('speed', 1000),
          colorQueue = this.get('color');

      if ('object' === (typeof colorQueue === 'undefined' ? 'undefined' : _typeof(colorQueue))) {
        (function updateFn() {
          if (self.isDestroyed || self.isDestroying) {
            return;
          }
          var color = colorQueue.shift();
          colorQueue.push(color);
          self.expandItem.call(self, color);
          if (!self.get('isLoading')) {
            outer.empty();
          } else {
            window.setTimeout(updateFn, speed);
          }
        })();
      } else {
        this.expandItem.call(this, colorQueue, true);
      }
    },
    expandItem: function expandItem(color, cleanUp) {
      var self = this,
          inner = $('<span>').css({ 'background-color': color }),
          outer = this.$(),
          innerWidth = 0,
          outerWidth = outer.width(),
          stepWidth = Math.round(outerWidth / 50);
      var ua = window.navigator.userAgent;
      var ie10 = ua.indexOf("MSIE "),
          ie11 = ua.indexOf('Trident/'),
          ieEdge = ua.indexOf('Edge/');

      outer.append(inner);

      var interval = window.setInterval(function () {
        var step = innerWidth = innerWidth + stepWidth;
        if (innerWidth > outerWidth) {
          window.clearInterval(interval);
          if (cleanUp) {
            outer.empty();
          }
        }
        if (ie10 > 0 || ie11 > 0 || ieEdge > 0) {
          inner.css({
            'margin': '0 auto',
            'width': step
          });
        } else {
          inner.css({
            'margin-left': '-' + step / 2 + 'px',
            'width': step
          });
        }
      }, 10);
    },
    didInsertElement: function didInsertElement() {
      this.$().html('<span>');

      var color = this.get('color');
      if (color) {
        this.$('span').css('background-color', color);
      }

      if (this.get('runManageInitially')) {
        this._startLoading();
      }
    }
  });


  function isFastBoot() {
    return typeof FastBoot !== 'undefined';
  }
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
define('aws-violations-project/mixins/loading-slider', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Mixin = Ember.Mixin,
      inject = Ember.inject,
      isPresent = Ember.isPresent;
  exports.default = Mixin.create({
    loadingSlider: inject.service(),

    actions: {
      loading: function loading() {
        var loadingSliderService = this.get('loadingSlider');
        loadingSliderService.startLoading();
        if (isPresent(this.router)) {
          this.router.one('didTransition', function () {
            loadingSliderService.endLoading();
          });
        }
        if (this.get('bubbleLoadingSlider')) {
          return true;
        }
      },
      finished: function finished() {
        this.get('loadingSlider').endLoading();
      }
    }
  });
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
            $('#loadingDivvol').remove();
            document.getElementById("uvt").innerHTML = "<h3>Awesome! None Untagged</h3>";
            document.getElementById("uvol").innerHTML = "<h3>Awesome! None Untagged</h3>";
          } else {
            // Object is NOT empty
            var ul = document.createElement('ul');
            $('#loadingDivvol').remove();
            document.getElementById("uvt").innerHTML = '<i class="fa fa-exclamation-triangle"></i>' + ' ' + "Warning: Untagged volumes";
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
            $('#loadingDivec2').remove();
            document.getElementById("uet").innerHTML = "<h3>Awesome! None Untagged</h3>";
            document.getElementById("uec2").innerHTML = "<h3>Awesome! None Untagged</h3>";
          } else {
            // Object is NOT empty
            var ul = document.createElement('ul');
            $('#loadingDivec2').remove();
            document.getElementById("uet").innerHTML = '<i class="fa fa-exclamation-triangle"></i>' + ' ' + "Warning: Untagged instances";
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
            $('#loadingDivuaa').remove();
            document.getElementById("uut").innerHTML = "<h3>Awesome! None unattached</h3>";
            document.getElementById("uaa").innerHTML = "<h3>Awesome! None unattached</h3>";
          } else {
            // Object is NOT empty
            var ul = document.createElement('ul');
            $('#loadingDivuaa').remove();
            document.getElementById("uut").innerHTML = '<i class="fa fa-exclamation-triangle"></i>' + ' ' + "Warning: Unattached volumes";
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
define('aws-violations-project/services/loading-slider', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Service = Ember.Service,
      Evented = Ember.Evented;
  exports.default = Service.extend(Evented, {
    startLoading: function startLoading() {
      this.trigger('startLoading');
    },
    endLoading: function endLoading() {
      this.trigger('endLoading');
    },
    changeAttrs: function changeAttrs(attrs) {
      this.trigger('changeAttrs', attrs);
    }
  });
});
define("aws-violations-project/templates/application", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "pNw4Q0ck", "block": "{\"symbols\":[],\"statements\":[[1,[18,\"AWS-ViolationTracker\"],false],[0,\"\\n\\n    \"],[1,[18,\"outlet\"],false],[0,\"\\n\\n\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "aws-violations-project/templates/application.hbs" } });
});
define("aws-violations-project/templates/untaggedresources", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "J9YGdK5U", "block": "{\"symbols\":[],\"statements\":[[6,\"h2\"],[9,\"align\",\"center\"],[7],[0,\"Results for resources violations\"],[8],[0,\"\\n\"],[6,\"hr\"],[7],[8],[0,\"\\n\\n\"],[6,\"div\"],[9,\"class\",\"wrapper\"],[7],[0,\"\\n\\n\\n\"],[6,\"section\"],[9,\"class\",\"columns\"],[7],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"column\"],[9,\"style\",\"background-color:#1a254c;\"],[7],[0,\"\\n\"],[6,\"div\"],[9,\"align\",\"center\"],[9,\"id\",\"loadingDivvol\"],[7],[6,\"i\"],[9,\"class\",\"fa fa-cog fa-spin fa-3x fa-fw\"],[9,\"style\",\"font-size:80px;color:white;\"],[7],[8],[8],[0,\"\\n    \"],[6,\"h4\"],[9,\"id\",\"uvt\"],[9,\"style\",\"color:white\"],[7],[8],[0,\"\\n   \"],[6,\"p\"],[9,\"id\",\"uvol\"],[9,\"style\",\"color:white; font-family: 'Roboto', sans-serif;\"],[7],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"column sk-rect sk-rect2\"],[9,\"style\",\"background-color:#434e77;\"],[7],[0,\"\\n\"],[6,\"div\"],[9,\"align\",\"center\"],[9,\"id\",\"loadingDivec2\"],[7],[6,\"i\"],[9,\"class\",\"fa fa-cog fa-spin fa-3x fa-fw\"],[9,\"style\",\"font-size:80px;color:white;\"],[7],[8],[8],[0,\"\\n    \"],[6,\"h4\"],[9,\"id\",\"uet\"],[9,\"style\",\"color:white\"],[7],[8],[0,\"\\n    \"],[6,\"p\"],[9,\"id\",\"uec2\"],[9,\"class\",\"ldBar\"],[9,\"data-value\",\"50\"],[9,\"style\",\"color:white; font-family: 'Roboto', sans-serif;\"],[7],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"column sk-rect sk-rect3\"],[9,\"style\",\"background-color:#1a254c;\"],[7],[0,\"\\n\"],[6,\"div\"],[9,\"align\",\"center\"],[9,\"id\",\"loadingDivuaa\"],[7],[6,\"i\"],[9,\"class\",\"fa fa-cog fa-spin fa-3x fa-fw\"],[9,\"style\",\"font-size:80px;color:white;\"],[7],[8],[8],[0,\"\\n    \"],[6,\"h4\"],[9,\"id\",\"uut\"],[9,\"style\",\"color:white\"],[7],[8],[0,\"\\n    \"],[6,\"p\"],[9,\"id\",\"uaa\"],[9,\"style\",\"color:white; font-family: 'Roboto', sans-serif;\"],[7],[8],[0,\"\\n\"],[8],[0,\"\\n\"],[8],[0,\"\\n\\n\"],[6,\"footer\"],[7],[0,\"\\n    \"],[6,\"h3\"],[7],[0,\"Developed By: Matthew L. Trotter\"],[8],[0,\"\\n    \"],[6,\"p\"],[7],[0,\"This application was written from scratch, no templates or snippet coding was used so this is a beta (dirty) ver. 0.1 release. This beta release; however, is fully functional, bug free and will cleanly locate resource violations within any AWS environment, simply provide an IAM key with the necessary permissions to describe services (read-only) and you are good to go! Further build/installation information can be found at \"],[6,\"a\"],[9,\"href\",\"https://github.com/sudir/aws_violations_project\"],[7],[0,\"my private github site\"],[8],[8],[0,\"\\n  \"],[8],[0,\"\\n  \\n\"],[8],[0,\"\\n\\n\\n\\n\\n\\n\\n\"],[6,\"style\"],[9,\"type\",\"text/css\"],[7],[0,\"\\n@import url(https://fonts.googleapis.com/css?family=Open+Sans);\\n\\nli{list-style-position:inside;}\\n\\n\\n* { box-sizing: border-box; \\noverflow:auto;\\n}\\n\\n\\nbody { \\n  font-family: 'Open Sans', sans-serif;\\n}\\n\\n/* STRUCTURE */\\n\\n.wrapper {\\n  padding: 5px;\\n  max-width: 100%;\\n  width: 95%;\\n  margin: 20px auto;\\n}\\nheader {\\n  padding: 0 15px;\\n}\\n\\n.columns {\\n  display: flex;\\n  flex-flow: row wrap;\\n  justify-content: center;\\n  margin: 5px 0;\\nheight:100%;\\n}\\n\\n.column {\\n  flex: 1;\\n  border: 1px solid gray;\\n  margin: 2px;\\n  padding: 10px;\\n  &:first-child { margin-left: 0; }\\n  &:last-child { margin-right: 0; }\\nheight:100%;\\n  \\n}\\n\\nfooter {\\n  padding: 0 15px;\\n}\\n\\n\\n@media screen and (max-width: 980px) {\\n  .columns .column {\\n    margin-bottom: 5px;\\n    flex-basis: 40%;\\n    &:nth-last-child(2) {\\n      margin-right: 0;\\n    }\\n    &:last-child {\\n      flex-basis: 100%;\\n      margin: 0;\\n    }\\n  }\\n}\\n\\n@media screen and (max-width: 680px) {\\n  .columns .column {\\n    flex-basis: 100%;\\n    margin: 0 0 5px 0;\\n  }\\n}  \\n\\n\\n\\n.sk-wave {\\n  margin: 40px auto;\\n  width: 50px;\\n  height: 40px;\\n  text-align: center;\\n  font-size: 10px; }\\n  .sk-wave .sk-rect {\\n    background-color: #333;\\n    height: 100%;\\n    width: 6px;\\n    display: inline-block;\\n    -webkit-animation: sk-waveStretchDelay 1.2s infinite ease-in-out;\\n            animation: sk-waveStretchDelay 1.2s infinite ease-in-out; }\\n  .sk-wave .sk-rect1 {\\n    -webkit-animation-delay: -1.2s;\\n            animation-delay: -1.2s; }\\n  .sk-wave .sk-rect2 {\\n    -webkit-animation-delay: -1.1s;\\n            animation-delay: -1.1s; }\\n  .sk-wave .sk-rect3 {\\n    -webkit-animation-delay: -1s;\\n            animation-delay: -1s; }\\n  .sk-wave .sk-rect4 {\\n    -webkit-animation-delay: -0.9s;\\n            animation-delay: -0.9s; }\\n  .sk-wave .sk-rect5 {\\n    -webkit-animation-delay: -0.8s;\\n            animation-delay: -0.8s; }\\n@-webkit-keyframes sk-waveStretchDelay {\\n  0%, 40%, 100% {\\n    -webkit-transform: scaleY(0.4);\\n            transform: scaleY(0.4); }\\n  20% {\\n    -webkit-transform: scaleY(1);\\n            transform: scaleY(1); } }\\n@keyframes sk-waveStretchDelay {\\n  0%, 40%, 100% {\\n    -webkit-transform: scaleY(0.4);\\n            transform: scaleY(0.4); }\\n  20% {\\n    -webkit-transform: scaleY(1);\\n            transform: scaleY(1); } }\\n\\n\"],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "aws-violations-project/templates/untaggedresources.hbs" } });
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
