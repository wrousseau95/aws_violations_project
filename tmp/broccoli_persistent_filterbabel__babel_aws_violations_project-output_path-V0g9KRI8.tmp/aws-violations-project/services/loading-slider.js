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