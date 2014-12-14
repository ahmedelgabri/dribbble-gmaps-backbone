var config   = require('../config.json');
var Backbone = require('backbone');
var $        = require('jquery');

Backbone.$ = $;


var userShotsCollection = Backbone.Collection.extend({
  initialize: function( id, per_page ) {
    var per_page = per_page || 12;
    this.url = config.dribbble.url + 'users/' + id + '/shots?access_token=' + config.dribbble.access_token + '&per_page=' + per_page;
  }
});


module.exports = userShotsCollection;
