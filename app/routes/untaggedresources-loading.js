import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return this.get('store').findAll('untaggedresources-loading');
  },

  actions: {
    loading(transition, originRoute) {
      let controller = this.controllerFor('foo');
      controller.set('currentlyLoading', true);

      return true; // allows the loading template to be shown
    }
  }
});