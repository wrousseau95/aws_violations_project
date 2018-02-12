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