/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-sliding-menu',
  included: function(app) {
    this._super.included(app);
    app.import(app.bowerDirectory + '/hammerjs/hammer.js');
  }
};
