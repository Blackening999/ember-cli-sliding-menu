import Ember from 'ember';

/**
 * Share Menu progress manager
 * so you can handle menu state from any controller or component
 */
export default Ember.Object.extend({
  menuProgress: 0,
  updateProgress: function(newProgress) {
    this.set('menuProgress', newProgress);
  }
});
