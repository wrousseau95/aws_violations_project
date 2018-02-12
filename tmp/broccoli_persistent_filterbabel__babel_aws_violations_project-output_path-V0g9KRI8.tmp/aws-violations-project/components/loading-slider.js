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