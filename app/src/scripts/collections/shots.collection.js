var config   = require('../config.json');
var Backbone = require('backbone');
var $        = require('jquery');

Backbone.$ = $;


var shotsCollection = Backbone.Collection.extend({
  initialize: function( id ) {
    this.url = config.dribbble.url + 'shots/' + id + '?access_token=' + config.dribbble.access_token;
  }
});


module.exports = shotsCollection;
