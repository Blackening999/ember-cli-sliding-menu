/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-sliding-menu',
  included: function(app) {
    this._super.included(app);

    app.import('bower_components/momentjs/moment.js');
    app.import('bower_components/hammerjs/hammer.js');
  }
};
