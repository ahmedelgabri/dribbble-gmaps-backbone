var config   = require('../config.json');
var Backbone = require('backbone');
var $        = require('jquery');

Backbone.$ = $;


var popularCollection = Backbone.Collection.extend({
  url: config.dribbble.url + 'shots?access_token=' + config.dribbble.access_token + '&list=popular&per_page=12'
});


module.exports = popularCollection;
