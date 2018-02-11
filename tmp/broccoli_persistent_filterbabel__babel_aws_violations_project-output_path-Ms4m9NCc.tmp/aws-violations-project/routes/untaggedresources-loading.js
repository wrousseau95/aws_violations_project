define('aws-violations-project/routes/untaggedresources-loading', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model: function model() {
      return this.get('store').findAll('untaggedresources-loading');
    },


    actions: {
      loading: function loading(transition, originRoute) {
        var controller = this.controllerFor('foo');
        controller.set('currentlyLoading', true);

        return true; // allows the loading template to be shown
      }
    }
  });
});