var config   = require('../config.json');
var Backbone = require('backbone');
var $        = require('jquery');

Backbone.$ = $;


var usersCollection = Backbone.Collection.extend({
  initialize: function( id ) {
    this.url = config.dribbble.url + 'users/' + id + '?access_token=' + config.dribbble.access_token;
  }
});


module.exports = usersCollection;
