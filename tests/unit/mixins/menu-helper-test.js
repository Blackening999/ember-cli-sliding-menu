import Ember from 'ember';
import MenuHelperMixin from 'ember-cli-sliding-menu/mixins/menu-helper';

module('MenuHelperMixin');

// Replace this with your real tests.
test('it works', function() {
  var MenuHelperObject = Ember.Object.extend(MenuHelperMixin);
  var subject = MenuHelperObject.create();
  ok(subject);
});
