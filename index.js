/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-sliding-menu',
  included: function(app) {
    this._super.included(app);

    this.app.import('bower_components/hammerjs/hammer.js');
  }
};
