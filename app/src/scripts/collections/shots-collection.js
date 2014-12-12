var config   = require('../config.json');
var Backbone = require('backbone');
var _        = require('lodash');
var $        = require('jquery');
var shotsModel = require('../models/shots-model');

Backbone.$ = $;


var shotsCollection = Backbone.Collection.extend({
  model: shotsModel,
  url: config.dribbble.url + 'shots?access_token=' + config.dribbble.access_token + '&list=popular&per_page=12',


});


module.exports = shotsCollection;
